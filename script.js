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

const showPopup = function (dataCat) {
    const popupCats = document.createElement("div");
    popupCats.classList.add("popup__cats");
    popupCats.innerHTML = `
        <img class="popup__img" src="${dataCat.img_link}" alt="${dataCat.name}">
    `;
    main.after(popupCats);
}
showPopup(cats);