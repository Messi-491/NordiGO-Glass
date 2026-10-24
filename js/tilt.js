/* ===== 3D-НАКЛОН ФОТО =====
   Работает только на устройствах с мышью (на телефоне наклона нет, чтобы не мешать прокрутке).
   TILT_TARGETS — какие элементы наклоняются. MAX_ANGLE — максимальный угол в градусах. */

const TILT_TARGETS = [
  ".hero__road", ".hero__forest > img",
  ".card__img", ".about-card img", ".person__photo"
];
const MAX_ANGLE = 9;

const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches
             && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canTilt) {
  document.querySelectorAll(TILT_TARGETS.join(",")).forEach(el => {
    el.setAttribute("data-tilt", "");

    el.addEventListener("pointermove", e => {
      const box = el.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width - 0.5;    // от -0.5 до 0.5
      const y = (e.clientY - box.top) / box.height - 0.5;
      el.style.setProperty("--ry", (x * MAX_ANGLE * 2).toFixed(2) + "deg");     // влево-вправо
      el.style.setProperty("--rx", (-y * MAX_ANGLE * 2).toFixed(2) + "deg");    // вверх-вниз
      el.classList.add("is-tilting");
    });

    el.addEventListener("pointerleave", () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.classList.remove("is-tilting");
    });
  });
}
