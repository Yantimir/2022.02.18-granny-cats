const main = document.querySelector(".main");
const mainCard = document.querySelector(".main__card");

/* ====== create CARD ====== */
const createCardItem = function (dataCat) {
    let cardItem = `
        <div class="card__item">
            <div class="card__img" style="background-image: url(${dataCat.img_link})"></div>
            <h3>${dataCat.name}</h3>
            <p class="rating">${showRating(dataCat.rate)}</p>
        </div>
    `
    mainCard.innerHTML += cardItem;
}
cats.forEach(dataCat => {
    createCardItem(dataCat);
});

/* ====== show REATING ====== */
function showRating(number) {
    let rating = "";
    let summaryRating = 10;
    let catFill = "<img src='img/cat-fill.svg' alt='catFill'>";
    let catStroke = "<img src='img/cat-stroke.svg' alt='catStroke'>";
    for (let i = 0; i < summaryRating; i++) {
        if(i < number){
            rating += catFill;
        }else{
            rating += catStroke;
        }
    }
    return rating;
}

/* ====== POPUP ====== */
const cardItem = document.querySelectorAll(".card__item");
for (let i = 0; i < cardItem.length; i++) {
    // console.log(cardItem[i]);
    cardItem[i].addEventListener("click", function (event) {
        showPopup(cats[i]);
    });
}

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
const showPopup = function (dataCat) {
    popupCats.classList.add("popup__cats_active"); // show popup
    popupCats.innerHTML = `
        <img class="popup__img" src="${dataCat.img_link}" alt="${dataCat.name}">
        <div class="popup__text">
            <h2>${dataCat.name}</h2>
            <h3>${dataCat.age} лет</h3>
            <p>${dataCat.description}</p>
            <div class="popup__cats-close" onclick="closePopup()"></div>
        </div>
    `;
    divLightBox.classList.add("popup__cats_lightbox_active"); // show lightbox 
}