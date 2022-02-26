if(Cookies.get('user')){
    window.location.replace('/'); 
}

const authForm = document.querySelector('.auth-form');
const inputName = authForm.querySelector('.auth-form__input');

authForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    if(inputName.value.trim() !== ""){
        document.cookie = `user=${inputName.value}; secure; samesite=lax;`;
        inputName.value = "";
        window.location.replace('/'); 
    }
    else {
        alert('Введите данные перед сохранением');
    }
})