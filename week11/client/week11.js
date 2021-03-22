import Auth from './Auth.js'

let instance = new Auth();

document.forms[0].addEventListener("submit", (event) => {
    event.preventDefault();
    instance.login()
})
