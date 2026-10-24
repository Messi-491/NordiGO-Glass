/* ===== ЭФФЕКТЫ: появление при скролле + параллакс ===== */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Появление блоков ----------
   Список селекторов — какие блоки должны плавно появляться. Добавляй свои. */
const REVEAL = [
  ".hero__about", ".features .title", ".feature", ".popular__collage", ".popular__text",
  ".manifest__text", ".cta__col",
  ".what-intro__collage", ".what-intro__text", ".history__text", ".history__photo",
  ".popular-world__collage", ".popular-world__text", ".why__text", ".pluses__photo", ".pluses__text",
  ".format", ".carousel", ".insta__title",
  ".card", ".about__title", ".about-card", ".person"
];

const revealItems = document.querySelectorAll(REVEAL.join(","));
revealItems.forEach(el => el.classList.add("reveal"));

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach(el => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      // небольшая задержка по очереди для соседних карточек (01 → 02 → 03)
      const index = [...el.parentElement.children].filter(c => c.classList.contains("reveal")).indexOf(el);
      el.style.transitionDelay = Math.min(index, 4) * 0.12 + "s";
      el.classList.add("is-visible");
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  revealItems.forEach(el => observer.observe(el));
}

/* ---------- 2. Параллакс ----------
   [селектор, сила]: чем больше число, тем сильнее фото смещается при прокрутке. */
const PARALLAX = [
  [".go__photo", 0.10],
  [".hero__road", 0.05],
];
const parallaxItems = [];
PARALLAX.forEach(([selector, strength]) => {
  document.querySelectorAll(selector).forEach(el => {
    el.setAttribute("data-parallax", "");
    parallaxItems.push({ el, strength });
  });
});
const panorama = document.querySelector(".panorama");   // большая панорама двигается внутри своей рамки

function updateParallax() {
  const screenCenter = window.innerHeight / 2;
  parallaxItems.forEach(({ el, strength }) => {
    const box = el.getBoundingClientRect();
    if (box.bottom < -200 || box.top > window.innerHeight + 200) return;   // не на экране — пропускаем
    const distance = box.top + box.height / 2 - screenCenter;
    const shift = Math.max(-40, Math.min(40, -distance * strength));        // не больше 40px
    el.style.setProperty("--shift", shift.toFixed(1) + "px");
  });
  if (panorama) {
    const box = panorama.getBoundingClientRect();
    if (box.bottom > 0 && box.top < window.innerHeight) {
      const progress = (screenCenter - (box.top + box.height / 2)) / window.innerHeight;  // от -1 до 1
      panorama.style.objectPosition = "50% " + (50 + Math.max(-1, Math.min(1, progress)) * 35) + "%";
    }
  }
}

if (!reduceMotion) {
  let waiting = false;
  window.addEventListener("scroll", () => {
    if (waiting) return;
    waiting = true;
    requestAnimationFrame(() => { updateParallax(); waiting = false; });
  }, { passive: true });
  window.addEventListener("resize", updateParallax);
  updateParallax();
}
