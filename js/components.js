/* ===== ОБЩИЕ БЛОКИ: шапка, меню, форма, подвал =====
   Они одинаковые на всех страницах, поэтому лежат здесь, а не копируются в каждый HTML.
   Хочешь поменять пункт меню или телефон — правь в этом файле один раз. */

const MENU_LINKS = [
  { text: "Головна",         href: "index.html" },
  { text: "Що таке нордік",  href: "what-is-nordic.html" },
  { text: "Про клуб",        href: "about.html" },
  { text: "Як приєднатися",  href: "join.html" },
  { text: "Блог",            href: "blog.html" },
  { text: "Контакти",        href: "contacts.html" },
];

const SOCIAL = `
  <a href="#" aria-label="Instagram"><img src="images/icons/instagram.svg" alt=""></a>
  <a href="#" aria-label="Facebook"><img src="images/icons/facebook.svg" alt=""></a>
  <a href="#" aria-label="Telegram"><img src="images/icons/telegram.svg" alt=""></a>`;

const currentPage = location.pathname.split("/").pop() || "index.html";

const linksHtml = MENU_LINKS.map(l =>
  `<a class="menu__link ${l.href === currentPage ? "is-current" : ""}" href="${l.href}">${l.text}</a>`
).join("");

const site = document.querySelector(".site");

site.insertAdjacentHTML("afterbegin", `
  <header class="header">
    <a class="logo" href="index.html">NordiGO</a>
    <button class="burger" aria-label="Меню"><span></span><span></span><span></span></button>
  </header>
`);

document.body.insertAdjacentHTML("afterbegin", `
  <nav class="menu" aria-label="Меню">
    <div class="menu__visual">
      <div class="menu__bg"></div>
      <div class="menu__word display">NordiGO</div>
      <img class="menu__photo" src="images/menu-photo.jpg" alt="">
    </div>
    <div class="menu__panel">
      <p class="menu__label">Меню</p>
      ${linksHtml}
      <div class="menu__contact">
        <a class="menu__email" href="mailto:email@nordigo.com">email@nordigo.com</a>
        <div class="social">${SOCIAL}</div>
      </div>
    </div>
  </nav>

  <div class="modal" role="dialog" aria-modal="true" aria-label="Запис на пробне тренування">
    <div class="modal__box">
      <button class="modal__close" aria-label="Закрити"></button>
      <form class="modal__form" novalidate>
        <h2 class="modal__title">Записатися на пробне тренування</h2>
        <input class="modal__input" name="name"  type="text"  placeholder="Ім’я" required>
        <input class="modal__input" name="phone" type="tel"   placeholder="Телефон" required>
        <input class="modal__input" name="email" type="email" placeholder="E-mail" required>
        <label class="modal__check">
          <input type="checkbox" required>
          <span>Натискаючи кнопку, я даю згоду на обробку персональних даних.</span>
        </label>
        <button class="modal__submit" type="submit">Записатися</button>
      </form>
      <p class="modal__thanks">Дякуємо! Ми зв’яжемося з вами найближчим часом.</p>
    </div>
  </div>
`);

site.insertAdjacentHTML("beforeend", `
  <footer class="footer">
    <a class="logo" href="index.html">NordiGO</a>
    <span>© Усі права захищено</span>
    <div class="social">${SOCIAL}</div>
  </footer>
`);
