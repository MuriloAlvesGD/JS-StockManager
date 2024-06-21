import {useEffect, useState, useParams } from 'react'
import React from 'react';
import './Home.css'
import axios from 'axios';
import {useNavigate} from "react-router";

function Home() {


    return (
        <>
            <header>
                <a href="homePage.html"><img id="logo" src="https://cdn-icons-png.flaticon.com/512/3134/3134338.png" alt=""/></a>
                <form action="">
                    <input id="searchInput" type="text" name="search" placeholder="pesquisar item"/>
                        <button type='submit' id="searchButton"><img
                            src="https://icones.pro/wp-content/uploads/2021/06/icone-loupe-gris.png" alt=""/></button>
                </form>
                <div></div>
            </header>

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

            <section>
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

                <div className="tabela" id="products"></div>
            </section>
        </>
    )
}

export default Home
