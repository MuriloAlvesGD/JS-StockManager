const form = document.querySelector("form");
const search = document.querySelector("#searchInput");

form.addEventListener("submit", function (event) {
    let products = JSON.parse(localStorage.getItem('productsList'));
    event.preventDefault();

    let result = products.some(obj => obj.name.toUpperCase() === search.value.toUpperCase());
    let searchObj = products.filter(obj => obj.name.toUpperCase() === search.value.toUpperCase());

    if (result) {
        localStorage.setItem('search', JSON.stringify(searchObj));
        window.location.replace('productPage.html');
    }
})


let products = JSON.parse(localStorage.getItem('search'));
let product = products[0];
const productCard = document.createElement('div');
const section = document.createElement('div');
const productInformation = document.createElement('div');
const buttons = document.createElement('div')
const sellButton = document.createElement('button');
const buyButton = document.createElement('button');
const img = document.createElement('img');
const titulo = document.createElement('H4');
const custo = document.createElement('H4');
const valor = document.createElement('H4');
const estoque = document.createElement('H4');

titulo.textContent = `nome: ${product.name}`;
valor.textContent = `Valor: R$${product.price}`
custo.textContent = `Custo: R$${product.cost}`
estoque.textContent = `Estoque: ${product.stock}`

buttons.id = 'productBtns';
sellButton.id = 'sellBtn';
sellButton.className = 'productBtn';
buyButton.id = 'buyBtn'
buyButton.className = 'productBtn';
section.id = 'section';
custo.id = 'productCost';
productCard.id = 'product';
productInformation.id = 'informations'
img.id = 'productImg';
titulo.id = 'productName';
valor.id = 'productPrice';
estoque.id = 'productStock';

img.src = "https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg";
sellButton.textContent = 'VENDER';
buyButton.textContent = 'COMPRAR';
productCard.appendChild(img);
buttons.appendChild(sellButton);
buttons.appendChild(buyButton);
productInformation.appendChild(titulo);
productInformation.appendChild(valor);
productInformation.appendChild(custo);
productInformation.appendChild(estoque);
section.appendChild(productInformation);
section.appendChild(buttons)
productCard.appendChild(section);
document.getElementById('products').appendChild(productCard);

function openPopUp(PopUp) {
    localStorage.setItem('productTransaction', JSON.stringify(product));
    window.open(PopUp, 'popUp', width = 50, height = 50);
}

sellButton.onclick = function (){
    openPopUp('vendaPopUp.html');

}
buyButton.onclick = function(){
    openPopUp('compraPopUp.html');
}