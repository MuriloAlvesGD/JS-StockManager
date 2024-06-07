const buyForm = document.querySelector("form");
const productformName = buyForm.getElementsByTagName("input")[0];
const productformCost = buyForm.getElementsByTagName("input")[1];
const productformValue = buyForm.getElementsByTagName("input")[2];
const productformStock = buyForm.getElementsByTagName("input")[3];



buyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newProduct = {
        name: productformName.value,
        cost: productformCost.value,
        value: productformValue.value,
        stock: productformStock.value,
    };

    let despesa = JSON.parse(localStorage.getItem('despesa'));
    despesa += newProduct.cost * newProduct.stock;

    localStorage.setItem('despesa', JSON.stringify(despesa));
    localStorage.setItem("newProduct", JSON.stringify(newProduct));

    console.log(newProduct);
    window.close();
})
