"use strict"

const formRegist = document.querySelector(".registr");
const formLogin = document.querySelector(".login");

const authorizeState = document.querySelector(".authorize__state");



function validateData(data, pattern, message)
{
    if (data != "") {
        if (data.match(pattern)) {
            return "Correct";
        }
        else {
            return message;
        }
    }
    return "Field is required";
}

window.addEventListener('keyup', (key) => {
    let username = key.target.closest(".registr__username input");
    let email = key.target.closest(".registr__email input");
    let password = key.target.closest(".registr__password input");
    if(username)
    {
        username.nextElementSibling.innerHTML = validateData(username.value, /^[0-9a-zA-Z]+$/, "Wrong username");
    }
    else if (email)
    {
        email.nextElementSibling.innerHTML = validateData(email.value, /\w+([\.-]?|\w+)*@\w+([\.-]?|\w+)*(\.\w{2,3})+$/, "Wrong email");
    }
    else if (password)
    {
        password.nextElementSibling.innerHTML = validateData(password.value, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, "Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter");
    }
    else {
        return;
    }
});


document.addEventListener('submit', (submit) => {
    submit.preventDefault();
    let registr = submit.target.closest(".registr");
    let log = submit.target.closest(".login");
    if(!registr && !login) return;
    if(registr)
    {
        register();
    }
    else if (log)
    {
        login();
    }
});

function register()
{
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        authorizeState.style.cssText = "opacity : 1;";
        authorizeState.style.display = "unset";
        if(this.readyState == 4)
        {
            authorizeState.innerHTML = this.responseText;
            authorizeState.style.cssText =
            `
            transition : all 5s linear;
            opacity : 0;
            `
            setTimeout(function() {
                authorizeState.style.display = "none"
            }, 5000);
        }
        else
        {
            authorizeState.innerHTML = `<img src="imgs/svgs/loading.svg" alt="" srcset="">`
        }
    }
    xhttp.open("POST", "../php/authorization.php")
    const registrUsername = document.querySelector(".registr__username input");
    const registrEmail = document.querySelector(".registr__email input");
    const registrPassword = document.querySelector(".registr__password input");
    let formData = new FormData();
    formData.append("usernameRegst", registrUsername.value);
    formData.append("emailRegst", registrEmail.value);
    formData.append("passwordRegst", registrPassword.value);
    formData.append("submitRegst", "submit");
    xhttp.send(formData);
}
function login()
{
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        authorizeState.style.cssText = "opacity : 1;";
        authorizeState.style.display = "unset";
        if(this.readyState == 4)
        {
            authorizeState.innerHTML = this.responseText;
            authorizeState.style.cssText =
            `
            transition : all 5s linear;
            opacity : 0;
            `
            setTimeout(function() {
                authorizeState.style.display = "none"
            }, 5000);
        }
        else
        {
            authorizeState.innerHTML = `<img src="imgs/svgs/loading.svg" alt="" srcset="">`
        }
    }
    xhttp.open("POST", "../php/authorization.php")
    const loginUsername = document.querySelector(".login__username input");
    const loginPassword = document.querySelector(".login__password input");
    let formData = new FormData();
    formData.append("usernameLogin", loginUsername.value);
    formData.append("passwordLogin", loginPassword.value);
    formData.append("submitLogin", "submit");
    xhttp.send(formData);
}


window.addEventListener('click', (e) => {
    let registr = e.target.closest(".authorize__regist");
    let login = e.target.closest(".authorize__login");
    if(registr)
    {
        formLogin.style.display = "none";
        formRegist.style.display = "flex";
        registr.classList.add("active");
        registr.nextElementSibling.classList.remove("active");
    }
    else if(login)
    {
        formRegist.style.display = "none";
        formLogin.style.display = "flex";
        login.previousElementSibling.classList.remove("active");
        login.classList.add("active");
    }
    else
    {
        return;
    }
});