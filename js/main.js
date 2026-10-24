/* ===== ПОВЕДЕНИЕ САЙТА: меню, форма, фильтр блога ===== */

/* ---------- Меню ---------- */
const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

function toggleMenu(open) {
  menu.classList.toggle("is-open", open);
  burger.classList.toggle("is-open", open);
  document.body.classList.toggle("no-scroll", open);
}
burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("is-open")));

/* ---------- Форма записи ---------- */
const modal = document.querySelector(".modal");
const form = modal.querySelector("form");

function toggleModal(open) {
  modal.classList.toggle("is-open", open);
  document.body.classList.toggle("no-scroll", open);
  if (!open) setTimeout(() => modal.classList.remove("is-sent"), 300);
}
// Любой элемент с атрибутом data-open-form открывает форму
document.querySelectorAll("[data-open-form]").forEach(el =>
  el.addEventListener("click", e => { e.preventDefault(); toggleModal(true); })
);
modal.querySelector(".modal__close").addEventListener("click", () => toggleModal(false));
modal.addEventListener("click", e => { if (e.target === modal) toggleModal(false); });

form.addEventListener("submit", e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  // Здесь потом можно отправить данные на сервер (fetch). Пока просто показываем "Дякуємо".
  modal.classList.add("is-sent");
  form.reset();
});

/* Esc закрывает всё */
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  toggleModal(false);
  toggleMenu(false);
});

/* ---------- Блог: фильтр Всі / Новини / Статті ---------- */
const tabs = document.querySelectorAll(".blog__tab");
const cards = document.querySelectorAll(".card");
tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(t => t.classList.toggle("is-active", t === tab));
  cards.forEach(c => c.classList.toggle("is-hidden", tab.dataset.filter !== "all" && c.dataset.type !== tab.dataset.filter));
}));
