let productsList = JSON.parse(localStorage.getItem('productsList'));
const productNameList = document.getElementById('productNameList');
const sellForm = document.querySelector("form");
const productformName = sellForm.getElementsByTagName("input")[0];
const productformStock = sellForm.getElementsByTagName("input")[1];
const product = JSON.parse(localStorage.getItem('productTransaction'));

if (product != undefined && product != null) {
    productformName.value = product.name;
    localStorage.removeItem("productTransaction");
}

productsList.forEach(product => {
    const productName = document.createElement('li');
    productName.innerHTML = `NOME: ${product.name} - ESTOQUE: ${product.stock}`;
    productNameList.appendChild(productName);
})

sellForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const sellProduct = productsList.find(obj => obj.name.toUpperCase() === productformName.value.toUpperCase());

    if (productformStock.value > sellProduct.stock || productformStock.value == null) {
        console.log(sellProduct);
        console.log('estoque insuficiente');
    }

    else if (sellProduct.stock >= productformStock.value && sellProduct.stock > 0) {

        sellProduct.stock -= productformStock.value;

        let faturamento = JSON.parse(localStorage.getItem('faturamento'));
        faturamento += sellProduct.price * productformStock.value;
        localStorage.setItem('faturamento', JSON.stringify(faturamento));
        localStorage.setItem('productsList', JSON.stringify(productsList));

        window.opener.location.href = 'homePage.html';
        window.close();
    }
})