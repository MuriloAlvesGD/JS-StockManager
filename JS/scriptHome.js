let products = JSON.parse(localStorage.getItem('productsList'));


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

// Adiciona o event listener ao objeto window
window.addEventListener('storage', onLocalStorageChanged);


products.forEach(product => {
    const productCard = document.createElement('div');
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
})

function openPopUp(PopUp) {
    window.open(PopUp, 'popUp', width = 50, height = 50);
}


const form = document.querySelector("form");
const search = document.querySelector("#searchInput");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let result = products.some(obj => obj.name.toUpperCase() === search.value.toUpperCase());
    const searchObj = products.filter(obj => obj.name.toUpperCase() === search.value.toUpperCase());

    if (result) {
        localStorage.setItem('search', JSON.stringify(searchObj));
        window.location.replace('productPage.html');
    }
})
