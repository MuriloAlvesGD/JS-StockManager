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


let product = JSON.parse(localStorage.getItem('search'));
console.log(product);
const productCard = document.createElement('div');
const img = document.createElement('img');
const titulo = document.createElement('H4');
const custo = document.createElement('H4');
const valor = document.createElement('H4');
const estoque = document.createElement('H4');
titulo.textContent = product.name;
valor.textContent = `Valor: R$${product.value}`
custo.textContent = `Custo: R$${product.cost}`
estoque.textContent = `Estoque: ${product.stock}`

custo.id = 'productCost';
productCard.id = 'product';
img.id = 'productImg';
titulo.id = 'productName';
valor.id = 'productPrice';
estoque.id = 'productStock';

img.src = "https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg";
productCard.appendChild(img);
productCard.appendChild(titulo);
productCard.appendChild(valor);
productCard.appendChild(custo);
productCard.appendChild(estoque);
document.getElementById('products').appendChild(productCard);