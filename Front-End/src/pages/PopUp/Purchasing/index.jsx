import React, {Component} from 'react';
import './Purchase.css'
import axios from 'axios';
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

function Purchasing() {
    const navigate = useNavigate();
    let url = window.location.pathname;
    let parts = url.split('/');
    const sellerId = parts[parts.length -1];
    const companyId = parts[parts.length -2];

    async function getCompanyName(id) {
        const response = await axios.put('http://localhost:3333/CompanyInformationsById', {
            id: id,
        })
        return response.data;
    }

    getCompanyName(companyId).then(response => {
        document.getElementById('companyNameAndCNPJ').innerHTML = response.name + ' | ' + response.cnpj;
    })

    React.useEffect(() => {
        const newProductBtn = document.querySelector("#newProductButton");
        let productForms = document.querySelector("#productForms");
        newProductBtn.onclick = () => {
            const form = document.createElement('form');
            const inputName = document.createElement('input');
            const inputCost = document.createElement('input');
            const inputValue = document.createElement('input');
            const inputStock = document.createElement('input');
            const textarea = document.createElement('textarea')
            inputName.type = 'text';
            inputName.className = 'productNameInput';
            inputName.placeholder = 'Nome do Produto';
            inputCost.type = 'number';
            inputCost.className = 'productCostInput';
            inputCost.placeholder = 'Custo do Produto';
            inputValue.type = 'number';
            inputValue.className = 'productValueInput';
            inputValue.placeholder = 'Valor de Venda'
            inputStock.type = 'number';
            inputStock.className = 'productStockInput';
            inputStock.placeholder = 'Estoque';
            textarea.className = 'productDescriptionInput';
            textarea.placeholder = 'Descriçao do produto';

            form.className = "buyForm";
            form.appendChild(inputName);
            form.appendChild(textarea);
            form.appendChild(inputCost);
            form.appendChild(inputValue);
            form.appendChild(inputStock);
            productForms.appendChild(form);
        }
    }, [])

    return (
        <>
            <header>
                <input type="checkbox" id="action-btn"></input>
                <label htmlFor="action-btn">
                    <img id="logo" src="https://cdn-icons-png.flaticon.com/512/3134/3134338.png" alt=""/>
                </label>

                <form action="">
                    <input id="searchInput" type="text" name="search" placeholder="pesquisar item"/>
                    <button type='submit' id="searchButton"><img
                        src="https://icones.pro/wp-content/uploads/2021/06/icone-loupe-gris.png" alt=""/></button>
            </form>
            <div id='companyNameAndCNPJ'></div>
        </header>

            <div id='container'>
                <div id='productForms'>
                    <h1>REGISTRAR COMPRA</h1>
                        <form className="buyForm" action="">
                            <input className="productNameInput" type="text" required name="productName" placeholder="Nome do Produto"/>
                            <textarea className="productDescriptionInput" name='productDescription' placeholder="Descriçao do produto"/>
                            <input className="productCostInput" type="number" required name="productCost" placeholder="Custo do Produto"/>
                            <input className="productValueInput" type="number" required name="productValue" placeholder="Valor de Venda"/>
                            <input className="productStockInput" type="number" required name="prductStock" placeholder="Estoque"/>
                        </form>
                </div>

                <button id="newProductButton">INSERIR NOVO PRODUTO</button>
                <button id="buyButton">FINALIZAR COMPRA</button>
            </div>
        </>
    )
}

export default Purchasing;