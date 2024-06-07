let products = JSON.parse(localStorage.getItem('productsList'));
let despesa = JSON.parse(localStorage.getItem('despesa'));
let lucro = JSON.parse(localStorage.getItem('lucro'));

if (lucro == null){
    lucro = 0;
}
if (despesa == null){
    despesa = 0;
}

const despesaDashboard = document.querySelector('#despesas > H2');
const lucroDashboard = document.querySelector('#lucro > H2');
const faturamentoDashboard = document.querySelector('#faturamento > H2');
despesaDashboard.textContent = 'R$' + despesa;
lucroDashboard.textContent = 'R$' + lucro;
faturamentoDashboard.textContent =  'R$' + (lucro - despesa);

// Função a ser executada quando o localStorage for modificado
function onLocalStorageChanged(event) {
    // Verifica se a chave alterada é a que você está interessado
    if (event.key === 'newProduct') {
        // Obtém o novo valor armazenado no localStorage
        const newProduct = JSON.parse(localStorage.getItem('newProduct'));
        let products = JSON.parse(localStorage.getItem('productsList'));
        products.push(newProduct);
        localStorage.setItem('productsList', JSON.stringify(products));

        window.location.reload();
    }
}

function openPopUp(PopUp) {
    window.open(PopUp, 'popUp', width = 50, height = 50);
}

function redirectProduct(nome) {
    let result = products.some(obj => obj.name.toUpperCase() === nome.toUpperCase());
    const searchObj = products.filter(obj => obj.name.toUpperCase() === nome.toUpperCase());

    if (result) {
        localStorage.setItem('search', JSON.stringify(searchObj));
        return 'productPage.html'
    }
}

// Adiciona o event listener ao objeto window
window.addEventListener('storage', onLocalStorageChanged);

products.forEach(product => {
    const productCard = document.createElement('a');
    const img = document.createElement('img');
    const titulo = document.createElement('H4');
    const valor = document.createElement('H4');
    const estoque = document.createElement('H4');
    productCard.id = 'product';
    img.id = 'productImg';
    titulo.id = 'productName';
    valor.id = 'productPrice';
    estoque.id = 'productStock';

    img.src = "https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg";
    titulo.textContent = product.name;
    valor.textContent = `Valor: R$${product.value}`
    estoque.textContent = `Estoque: ${product.stock}`
    productCard.appendChild(img);
    productCard.appendChild(titulo);
    productCard.appendChild(valor);
    productCard.appendChild(estoque);
    document.getElementById('products').appendChild(productCard);
    productCard.href = redirectProduct(product.name);
})


const form = document.querySelector("form");
const search = document.querySelector("#searchInput");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    window.location.replace(redirectProduct(search.value));
})
