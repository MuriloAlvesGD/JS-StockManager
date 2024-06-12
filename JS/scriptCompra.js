const buyForm = document.querySelector("form");
const productformName = buyForm.getElementsByTagName("input")[0];
const productformCost = buyForm.getElementsByTagName("input")[1];
const productformPrice = buyForm.getElementsByTagName("input")[2];
const productformStock = buyForm.getElementsByTagName("input")[3];

const product = JSON.parse(localStorage.getItem('productTransaction'));

if (product != undefined && product != null) {
    productformName.value = product.name;
    productformCost.value = product.cost;
    productformPrice.value = product.price;
    productformStock.value = product.stock;
    localStorage.removeItem("productTransaction");
}

buyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newProduct = {
        name: productformName.value,
        cost: productformCost.value,
        price: productformPrice.value,
        stock: productformStock.value,
    };

    let despesa = JSON.parse(localStorage.getItem('despesa'));
    despesa += newProduct.cost * newProduct.stock;

    localStorage.setItem('despesa', JSON.stringify(despesa));
    localStorage.setItem("newProduct", JSON.stringify(newProduct));

    window.opener.location.href='homePage.html';
    window.close();
})
