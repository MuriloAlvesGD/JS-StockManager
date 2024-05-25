const form = document.querySelector("form");
const email = document.querySelector(".email");
const password = document.querySelector(".password");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const acessDate = {
        email: email.value,
        password: password.value,
    }

    console.log(acessDate);

    if (acessDate.email === "murilo.alves@maisunifacisa.com" && acessDate.password === "murilo") {
        window.location.replace("homePage.html");
    }
    else{
        window.alert("usuário ou senha inválida!");
    }
})
