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

    class productForm extends Component{
        render() {
            return (
                <div className="buyForm">
                    <form action="">
                        <input className="productNameInput" type="text" required name="productName"
                               placeholder="Nome do Produto"/>
                        <textarea className="productDescriptionInput" name='productDescription'
                                  placeholder="Descriçao do produto"/>
                        <input className="productCostInput" type="number" required name="productCost"
                               placeholder="Custo do Produto"/>
                        <input className="productValueInput" type="number" required name="productValue"
                               placeholder="Valor de Venda"/>
                        <input className="productStockInput" type="number" required name="prductStock"
                               placeholder="Estoque"/>
                    </form>
                </div>
            )
        }
    }

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
            productForms.appendChild(productForm);
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

            <div id="box">
                <div id='productForms'>
                    <h1>REGISTRAR COMPRA</h1>
                    <div className="buyForm">
                        <form action="">
                            <input className="productNameInput" type="text" required name="productName" placeholder="Nome do Produto"/>
                            <textarea className="productDescriptionInput" name='productDescription' placeholder="Descriçao do produto"/>
                            <input className="productCostInput" type="number" required name="productCost" placeholder="Custo do Produto"/>
                            <input className="productValueInput" type="number" required name="productValue" placeholder="Valor de Venda"/>
                            <input className="productStockInput" type="number" required name="prductStock" placeholder="Estoque"/>
                        </form>
                    </div>
                </div>

                <button id="newProductButton">INSERIR NOVO PRODUTO</button>
                <button id="buyButton">FINALIZAR COMPRA</button>
            </div>
        </>
    )
}

export default Purchasing;