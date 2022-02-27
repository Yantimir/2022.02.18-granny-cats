if (!Cookies.get('user')) {
    window.location.replace('/auth.html');
}

const main = document.querySelector(".main");
const mainCard = main.querySelector(".main__card");
const templateCat = document.querySelector("#card-cat-template");

const wrapperPopup = document.querySelector(".wrapper__popup");
const popupCats = wrapperPopup.querySelector(".popup_type_cats-info");
const popupCatImage = wrapperPopup.querySelector(".popup__cat-img");
const popupCatName = wrapperPopup.querySelector(".popup__cat-name");
const popupCatAge = wrapperPopup.querySelector(".popup__cat-age");
const popupCatDescription = wrapperPopup.querySelector(".popup__cat-description");
const popupCatId = wrapperPopup.querySelector(".popup__cat-id");

const closePopupCat = wrapperPopup.querySelector(".popup__img-close");

const popupAddCat = document.querySelector(".popup_add_cat-info");

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
function closePopup(e) {
    const popupActive = document.querySelector(".popup_opened");
    if (popupActive) {
        popupActive.classList.remove("popup_opened");
    }
}

// функция слушатель
function handleClosePopup() {
    closePopup(popupCats);
}

function handleClickBtnAddCat() {
    openPopup(popupAddCat);
}

function handleClickCloseBtn(e) {
    if (e.target.classList.contains("popup__img-close")) {
        closePopup();
    }
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
        popupCatName.innerHTML = dataCat.name;
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
function overwritingLocalStorage() {
    localStorage.clear();
    mainCard.innerHTML = "";
    getEveryCats();
}

/* ===== данные в карточку =====================================================*/
function getEveryCats() {
    api.getAllCats().then(({ data }) => {
        // set localStorage
        setLocalStorage("cats", data);
        // templateCardCat    
        data.forEach((item) => {
            const newCat = createCardCat(item);
            createCardToMainCard(newCat, mainCard);
        });
    });
}

/* =====  функция удаления карточки кота ======================================*/
function deleteFormCat() {
    api.deleteCat(popupCatId.textContent);
    // newCatCard.remove();
    overwritingLocalStorage();
    closePopup();
}

wrapperPopup.addEventListener("click", handleClickCloseBtn);
btnOverwritingLocalStorage.addEventListener("click", overwritingLocalStorage);
btnAddCat.addEventListener("click", handleClickBtnAddCat);
btnDeleteCat.addEventListener("click", deleteFormCat);


if (!localStorage.getItem("cats")) {
    getEveryCats();
} else {
    let getDataForLocalStorage = getLocalStorage("cats");
    getDataForLocalStorage.forEach((item) => {
        const newCat = createCardCat(item);
        createCardToMainCard(newCat, mainCard);
    });
}
/* <a target="_blank" href="https://icons8.ruundefined">Корзина</a> иконка от <a target="_blank" href="https://icons8.ru">Icons8</a> */ 