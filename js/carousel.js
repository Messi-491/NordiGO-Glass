/* ===== СЛАЙДЕР (Instagram на странице "Як приєднатися") =====
   Стрелки листают по одной фотографии. Работает и свайпом на телефоне. */

const carousel = document.querySelector(".carousel");
if (carousel) {
  const track = carousel.querySelector(".carousel__track");
  const items = carousel.querySelectorAll(".carousel__item");
  const prev = document.querySelector(".carousel__btn--prev");
  const next = document.querySelector(".carousel__btn--next");
  let index = 0;

  function step()    { return items[1].offsetLeft - items[0].offsetLeft; }          // ширина шага
  function visible() { return Math.max(1, Math.round(carousel.clientWidth / step())); } // сколько видно сразу
  function maxIndex(){ return items.length - visible(); }

  function show(i) {
    index = Math.min(Math.max(i, 0), maxIndex());
    track.style.transform = `translateX(-${index * step()}px)`;
    prev.disabled = index === 0;
    next.disabled = index === maxIndex();
  }
  prev.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => show(index + 1));
  window.addEventListener("resize", () => show(index));

  // Свайп пальцем
  let startX = 0;
  carousel.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 40) show(index + (diff < 0 ? 1 : -1));
  });
  show(0);
}
