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

    const sellProduct = productsList.find(obj  => obj.name.toUpperCase() === productformName.value.toUpperCase());

    if (productformStock.value > sellProduct.stock || productformStock.value == null){
        console.log(sellProduct);
        console.log('estoque insuficiente');
    }
    else if(sellProduct.stock >= productformStock.value){
        sellProduct.stock -= productformStock.value;
        localStorage.setItem('productsList', JSON.stringify(productsList));
        console.log(JSON.parse(localStorage.getItem('productsList')));
        console.log('produto vendido');

        window.close();
    }
})