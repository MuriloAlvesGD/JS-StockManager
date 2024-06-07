const form = document.querySelector("form");
const email = document.querySelector(".email");
const password = document.querySelector(".password");


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const acessDate = {
        email: email.value,
        password: password.value,
    }

    if(acessDate.email=="teste1" && acessDate.password=="teste1"){
        window.location.replace("homePage.html");
    }

    else{
        window.alert("usuário ou senha inválida!");
    }
})
