const onError = (response) => {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject({
        message: 'Сервер не доступен',
        error: response
    })
    // return alert("Ошибка сервера, либо сервер не доступен");
}

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getAllCats() {
        return fetch(`${this._url}/show`)
            .then(onError)
            .catch(alert("Что-то пошло не по плану!"))
    }

    getCatById(value) {
        return fetch(`${this._url}/show/${value}`)
            .then(onError)
            .catch(alert("Что-то пошло не по плану!"))
    }

    addCat(bodyData) {
        return fetch(`${this._url}/add`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(bodyData)
        })
            .then(onError)
            .catch(alert("Что-то пошло не по плану!"))
    }

    updateCat(value, bodyData) {
        return fetch(`${this._url}/update/${value}`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify(bodyData)
        })
            .then(onError)
            .catch(alert("Что-то пошло не по плану!"))
    }

    deleteCat(value) {
        return fetch(`${this._url}/delete/${value}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(onError)
            .catch(alert("Что-то пошло не по плану!"))
    }
}

const api = new Api({
    url: 'https://sb-cats.herokuapp.com/api',
    headers: {
        "Content-type": "application/json",
        // "Accept": "application/json"
    }
})




