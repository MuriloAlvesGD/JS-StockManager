let productsList = JSON.parse(localStorage.getItem('productsList'));
const productNameList = document.getElementById('productNameList');

productsList.forEach(product => {
    const productName = document.createElement('li');
    productName.innerHTML = `NOME: ${product.name} - ESTOQUE: ${product.stock}`;
    productNameList.appendChild(productName);
})

const sellForm = document.querySelector("form");
const productformName = sellForm.getElementsByTagName("input")[0];
const productformStock = sellForm.getElementsByTagName("input")[1];


sellForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const sellProduct = productsList.find(obj => obj.name.toUpperCase() === productformName.value.toUpperCase());

    if (productformStock.value > sellProduct.stock || productformStock.value == null) {
        console.log(sellProduct);
        console.log('estoque insuficiente');
    }

    else if (sellProduct.stock >= productformStock.value && sellProduct.stock > 0) {

        sellProduct.stock -= productformStock.value;

        let lucro = JSON.parse(localStorage.getItem('lucro'));
        lucro += sellProduct.value * productformStock.value;
        localStorage.setItem('lucro', JSON.stringify(lucro));
        localStorage.setItem('productsList', JSON.stringify(productsList));

        window.opener.location.href = 'homePage.html';
        window.close();
    }
})