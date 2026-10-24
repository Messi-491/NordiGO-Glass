/* ===== БЛОГ: окошко со статьёй поверх страницы =====
   Нажали "Читати" -> страница остаётся на месте, фон размывается, по центру открывается окно.
   Тексты ниже — короткие заготовки. Замени их на свои: это обычные строки в кавычках. */

const ARTICLES = {
  1: {
    title: "На що впливає скандинавська ходьба",
    date: "11 листопада, 2020",
    image: "images/blog-1.jpg",
    text: [
      "Під час скандинавської ходьби працює до 90% м’язів: не лише ноги, а й руки, плечі, спина та корпус.",
      "Регулярні тренування зміцнюють серцево-судинну систему, додають витривалості та гнучкості. Навантаження на суглоби при цьому м’яке, тому нордік підходить майже всім.",
      "А ще це прогулянка на свіжому повітрі, яка допомагає знизити рівень стресу."
    ]
  },
  2: {
    title: "Особистий досвід: як я почав займатися нордіком",
    date: "5 листопада, 2020",
    image: "images/blog-2.jpg",
    text: [
      "Усе почалося з однієї пробної прогулянки в парку. Я думав, що це просто ходьба з палицями, але вже після першого тренування відчув, як працюють плечі та спина.",
      "За кілька тижнів з’явилася звичка щодня бути на свіжому повітрі, а разом із нею — бадьорість і гарний настрій.",
      "Якщо вагаєтеся — просто спробуйте один раз. Палиці та підказки інструктора знайдуться."
    ]
  },
  3: {
    title: "Як і де проходитимуть тренування у листопаді",
    date: "25 жовтня, 2020",
    image: "images/blog-3.jpg",
    text: [
      "У листопаді тренуємося в парках міста за звичним графіком. Збір за кілька хвилин до початку, щоб спокійно підготуватися.",
      "Тренування складається з 10-хвилинної розминки, близько 40 хвилин ходьби та 10-хвилинної заминки.",
      "Одягайтеся по погоді та беріть зручне взуття. Точний час і місце повідомимо перед кожним тренуванням."
    ]
  },
  4: {
    title: "Топ-10 місць для занять нордіком у Києві",
    date: "14 жовтня, 2020",
    image: "images/blog-4.jpg",
    text: [
      "Київ чудово підходить для скандинавської ходьби: тут багато парків, лісопарків і набережних.",
      "Серед улюблених місць — Труханів острів, Гідропарк, Голосіївський парк та Ботанічний сад. Рівні доріжки та тінь від дерев роблять їх зручними для тренувань.",
      "У повній добірці зібрали маршрути та поради, де краще ходити з палицями."
    ]
  },
  5: {
    title: "Як проходять тренування у клубі NordiGo",
    date: "10 жовтня, 2020",
    image: "images/blog-5.jpg",
    text: [
      "Кожне тренування починається з 10-хвилинної розминки, потім — близько 40 хвилин ходьби та 10 хвилин заминки.",
      "Інструктори навчають правильної техніки, підбирають комфортний темп і допомагають із палицями.",
      "Досвід не потрібен: достатньо зручного одягу та взуття. Решту покажемо на місці."
    ]
  },
  6: {
    title: "Нордік: з чого почати тренування",
    date: "1 жовтня, 2020",
    image: "images/blog-6.jpg",
    text: [
      "Почніть зі зручного взуття та палиць, які підходять вам за зростом.",
      "Базова техніка проста: руки й ноги працюють у протифазі, а палиці рухаються трохи позаду. Починайте з 20–30 хвилин у спокійному темпі та поступово збільшуйте.",
      "Найпростіше — прийти на пробне тренування: усе покажуть і підкажуть."
    ]
  }
};

/* ---------- Окошко (создаётся один раз) ---------- */
document.body.insertAdjacentHTML("beforeend", `
  <div class="article" role="dialog" aria-modal="true" aria-labelledby="article-title">
    <div class="article__box">
      <button class="article__close" aria-label="Закрити"></button>
      <img class="article__img" src="" alt="">
      <div class="article__body">
        <p class="article__date"></p>
        <h2 class="article__title" id="article-title"></h2>
        <div class="article__text"></div>
        <button class="btn-orange article__cta" type="button">Записатися на пробне</button>
      </div>
    </div>
  </div>
`);

const articleWindow = document.querySelector(".article");
const articleClose = articleWindow.querySelector(".article__close");
let lastOpener = null;

function openArticle(id, opener) {
  const a = ARTICLES[id];
  if (!a) return;
  articleWindow.querySelector(".article__img").src = a.image;
  articleWindow.querySelector(".article__date").textContent = a.date;
  articleWindow.querySelector(".article__title").textContent = a.title;
  articleWindow.querySelector(".article__text").innerHTML = a.text.map(t => `<p>${t}</p>`).join("");
  articleWindow.querySelector(".article__box").scrollTop = 0;
  lastOpener = opener;
  articleWindow.classList.add("is-open");
  document.body.classList.add("no-scroll");
  articleClose.focus();
}

function closeArticle() {
  if (!articleWindow.classList.contains("is-open")) return;
  articleWindow.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  if (lastOpener) lastOpener.focus();
}

document.querySelectorAll("[data-article]").forEach(el =>
  el.addEventListener("click", e => { e.preventDefault(); openArticle(el.dataset.article, el); })
);
articleClose.addEventListener("click", closeArticle);
articleWindow.addEventListener("click", e => { if (e.target === articleWindow) closeArticle(); });  // клик по затемнению
document.addEventListener("keydown", e => { if (e.key === "Escape") closeArticle(); });

// Кнопка в окошке: закрываем статью и открываем форму записи
articleWindow.querySelector(".article__cta").addEventListener("click", () => {
  closeArticle();
  toggleModal(true);      // функция из main.js
});
