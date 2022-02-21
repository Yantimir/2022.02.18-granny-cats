const main = document.querySelector(".main");
const mainCard = document.querySelector(".main__card");
const cardItem = document.querySelectorAll(".card__item");

/* ====== show REATING ========================================================== */
function showRating(number) {
    let rating = "";
    let summaryRating = 10;
    let catFill = "<img src='img/cat-fill.svg' alt='catFill'>";
    let catStroke = "<img src='img/cat-stroke.svg' alt='catStroke'>";
    for (let i = 0; i < summaryRating; i++) {
        if (i < number) {
            rating += catFill;
        } else {
            rating += catStroke;
        }
    }
    return rating;
}

/* ====== POPUP ================================================================= */
const popupCats = document.querySelector(".popup__cats");
const popupCatsClose = document.querySelector(".popup__cats-close");
const divLightBox = document.createElement("div"); // create div for lightbox
divLightBox.classList.add("popup__cats_lightbox");
popupCats.before(divLightBox);

/* -- close popup -- */
const closePopup = function () {
    popupCats.classList.remove("popup__cats_active"); // close popup
    divLightBox.classList.remove("popup__cats_lightbox_active"); // close lightbox
}
/* -- show popup -- */
const showPopup = function (data) {
    popupCats.classList.add("popup__cats_active"); // show popup
    popupCats.innerHTML = `
        <img class="popup__img" src="${data.img_link}" alt="${data.name}">
        <div class="popup__text">
            <h2>${data.name}</h2>
            <h3>${data.age} лет</h3>
            <p>${data.description}</p>
            <div class="popup__cats-close" onclick="closePopup()"></div>
        </div>
    `;
    divLightBox.classList.add("popup__cats_lightbox_active"); // show lightbox 
}

/* ===== функция TEMPLATE клон карточки =========================================*/
const template = function (data) {
    const templateCat = document.querySelector("#card-cat-template").content;

    // получение фрагмента

    // имя кота
    const newCatCard = templateCat.querySelector(".card__item").cloneNode(true);
    const catName = newCatCard.querySelector('h3');
    catName.textContent = data.name;

    // фото кота
    const imgTemplate = newCatCard.querySelector(".card__img");
    imgTemplate.style.backgroundImage = `url(${data.img_link})`;

    // рейтинг кота
    const ratingTemplate = newCatCard.querySelector(".rating");
    ratingTemplate.innerHTML = showRating(data.rate);

    // POPUP при клике на карточку
    newCatCard.addEventListener("click", function (e) {
        showPopup(data);
    });

    // дубликат узла
    mainCard.append(newCatCard);
}

/* ===== данные в карточку =====================================================*/
api.getAllCats().then(dataCat => {
    dataCat.data.forEach(item => {
        template(item);
    });
});