import React from 'react';
import './Home.css'
import axios from 'axios';
import {useNavigate} from "react-router";

function Home() {
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

        const buyBtn = document.getElementById('buyRegister');
        buyBtn.onclick = () =>{
            navigate(`/Purchasing/${companyId}/${sellerId}`);
        }

    }, [])

    return (
        <>
        <header>
            <input type="checkbox" id="action-btn"></input>
                <label for="action-btn">
                    <img id="logo" src="https://cdn-icons-png.flaticon.com/512/3134/3134338.png" alt=""/>
                </label>

        <form action="">
            <input id="searchInput" type="text" name="search" placeholder="pesquisar item"/>
            <button type='submit' id="searchButton"><img
                src="https://icones.pro/wp-content/uploads/2021/06/icone-loupe-gris.png" alt=""/></button>
        </form>
        <div id='companyNameAndCNPJ'></div>
        </header>

    <div id="dashBoards">
        <div className="dashBoard" id="faturamento">
            <h1>FATURAMENTO</h1>
            <h2>R$0,00</h2>
        </div>
                <div className="dashBoard" id="lucro">
                    <h1>LUCRO</h1>
                    <h2>R$0,00</h2>
                </div>
                <div className="dashBoard" id="despesas">
                    <h1>DESPESAS</h1>
                    <h2>-R$0,00</h2>
                </div>
            </div>

            <div id="registerButtons">
                <button id="sellRegister" className="registerButton">
                    <h1>REGISTRAR VENDA</h1>
                    <p>vendeu algo e deseja vendar. Clique aqui</p>
                </button>
                <button id="buyRegister" className="registerButton">
                    <h1>REGISTRAR COMPRA</h1>
                    <p>Novos produtos entrando? Clique aqui</p>
                </button>
            </div>

            <div className="tabela" id="products"></div>

        </>
    )
}

export default Home
