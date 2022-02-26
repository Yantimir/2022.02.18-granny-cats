if (!Cookies.get('user')) {
    window.location.replace('/auth.html');
}

const main = document.querySelector(".main");
const mainCard = main.querySelector(".main__card");
const templateCat = document.querySelector("#card-cat-template");

const popupCats = document.querySelector(".popup_type_cats-info");
const popupCatImage = popupCats.querySelector(".popup__img");
const popupText = popupCats.querySelector(".popup__text");
const popupCatAge = popupCats.querySelector(".popup__cat-age");
const popupCatDescription = popupCats.querySelector(".popup__cat-description");
const popupCatId = popupCats.querySelector(".popup__cat-id");
const popupAddCat = document.querySelector(".popup_add_cat-info");
const closePopupCats = document.querySelector(".popup__img-close");

const btnOverwritingLocalStorage = document.querySelector(".button-overwriting-local-storage");
const btnAddCat = document.querySelector(".button-add-cat");
const btnDeleteCat = document.querySelector(".popup__delete-form__send-button");





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
// функция открытия POPUP
function openPopup(popup) {
    popup.classList.add("popup_opened");
}
// функция закрытия POPUP
function closePopup() {
    const popupActive = document.querySelector(".popup_opened");
    if (popupActive) {
        popupActive.classList.remove("popup_opened");
    }
}
// функция слушатель
// function handleClosePopup() {
//     closePopup(popupCats); 
//     closePopup(popupAddCat);
// }

function handleClickButtonAddCat() {
    openPopup(popupAddCat);
}

/* ===== функция template клон карточки =========================================*/
function createCardCat(dataCat) {
    const newCatCard = templateCat.content.querySelector(".card__item").cloneNode(true);
    const nameCatCard = newCatCard.querySelector('h3'); // имя кота
    const imgCatCard = newCatCard.querySelector(".card__img"); // фото кота
    const ratingCatCard = newCatCard.querySelector(".cat-rating"); // рейтинг кота
    // получение фрагмента
    // имя кота
    nameCatCard.textContent = dataCat.name;
    // фото кота
    imgCatCard.style.backgroundImage = `url(${dataCat.img_link})`;
    // рейтинг кота
    ratingCatCard.innerHTML = showRating(dataCat.rate);


    function handleClickCatImage() {
        popupText.innerHTML = dataCat.name;
        popupCatImage.src = dataCat.img_link;
        popupCatAge.textContent = dataCat.age + " лет";
        popupCatDescription.textContent = dataCat.description;
        popupCatId.textContent = dataCat.id;
        openPopup(popupCats);
    }
    newCatCard.addEventListener("click", handleClickCatImage);
    return newCatCard;
}
// функция добавления карточки
function createCardToMainCard(elementNode, container) {
    container.append(elementNode);
}

/* ====== localStorage ========================================================== */
// функция записи localStorage
function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
// функция получения localStorage
const getLocalStorage = function (key) {
    return JSON.parse(localStorage.getItem(key));
}
// функция перезаписи localStorage
function overwritingLocalStorage(e) {
    e.preventDefault();
    localStorage.clear();
    api.getAllCats().then(dataCat => {
        setLocalStorage("cats", dataCat.data);
    });
}
// function overwritingLocalStorage(e, data) {
//     if (e.target) {
//         localStorage.clear();
//         setLocalStorage("cats", data);
//     }
// }

/* ===== данные в карточку =====================================================*/
// if (!localStorage.getItem("cats")) {
//     api.getAllCats().then(dataCat => {
//         setLocalStorage("cats", dataCat.data);
//         dataCat.data.forEach((item) => {
//             const newCat = createCardCat(item);
//             createCardToMainCard(newCat, mainCard);
//         });
//     });
// } else {
//     let dataLocalStorage = getLocalStorage("cats");

//     dataLocalStorage.forEach((item) => {
//         const newCat = createCardCat(item);
//         createCardToMainCard(newCat, mainCard);
//     });
// }

api.getAllCats().then(dataCat => {
    // templateCardCat
    dataCat.data.forEach((item) => {
        const newCat = createCardCat(item);
        createCardToMainCard(newCat, mainCard);
    });

    // localStorage
    if (!localStorage.getItem("cats")) {
        setLocalStorage("cats", dataCat.data); // set localStorage
    }
    // function getDataForLocalStorage(callback, dataCat) {
    //     let dataLocalStorage = JSON.stringify(dataCat.data);
    //     callback(dataLocalStorage);
    // }
    // getDataForLocalStorage(overwritingLocalStorage);


    
});

// функция удаления карточки кота
function deleteFormCat() {
    api.getAllCats().then(dataCat => {
        dataCat.data.forEach((item) => {
            if (popupCatId.textContent == item.id) {
                api.deleteCat(popupCatId.textContent);  
            }
        });
        localStorage.clear();
        setLocalStorage("cats", dataCat.data);
    });
}



closePopupCats.addEventListener("click", closePopup);
btnOverwritingLocalStorage.addEventListener("click", overwritingLocalStorage);
btnAddCat.addEventListener("click", handleClickButtonAddCat);
btnDeleteCat.addEventListener("click", deleteFormCat);