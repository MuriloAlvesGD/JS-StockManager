import React, { Component } from 'react';
import {useNavigate} from "react-router";
import './Register.css';
import axios from 'axios';

function Register (){
    const navigate = useNavigate();

    React.useEffect(()=>{
        async function verifyLoginAndDocExistence(userLogin, registerCPF, registerRG){
            const response = await axios.put("http://localhost:3333/auth/Docs/Register",{
                login: userLogin,
                CPF: registerCPF,
                RG: registerRG,
            });
            return response.data;
        }

        async function isEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex.test(email)) {
                return true; // Email válido
            } else {
                return false; // Email inválido
            }
        }
        const form = document.querySelector('form');
        form.addEventListener("submit", (e)=>{
            e.preventDefault();
            const name = document.querySelector(".name").value;
            const CPF = document.querySelector(".CPF").value;
            const RG = document.querySelector(".RG").value;
            const email = document.querySelector(".email").value;
            const password = document.querySelector(".password").value;
            const gender = document.querySelector(".seletor").value;
            const bornDate = document.querySelector(".bornDate").value;

            const userData = {
                name: name,
                CPF: CPF,
                RG: RG,
                gender: gender,
                login: email,
                password: password,
                bornDate: bornDate,
                acessLevel: 0,
                situation: false,
                company_id: null,
            }

            if (isEmail(email)) {
                verifyLoginAndDocExistence(email, CPF, RG).then(response => {
                    if (response.auth) {
                        localStorage.setItem('userData', JSON.stringify(userData));
                        navigate('/Register/Company');
                    } else {
                        window.alert(response.errorMensage);
                    }
                })
            }
            else {
                window.alert("insirá um email inválido");
            }
        })

    },[])

    return (
        <div id="box">
            <div id='registerUserForm'>
                <h1>CRIAR NOVA CONTA</h1>
                <form action="">
                    <input className="name" type="text" required name="name" placeholder="Nome"/>
                    <input className="CPF" type="text" required name="CPF" placeholder="CPF"/>
                    <input className="RG" type="text" required name="RG" placeholder="RG"/>
                    <input className="email" type="text" required name="email" placeholder="Email"/>
                    <input className="password" type="password" required name="password" placeholder="Senha"/>
                    <select className="seletor">
                        <option defaultChecked={true}>select gender...</option>
                        <option>MASCULINO</option>
                        <option>FEMININO</option>
                    </select>
                    <input className="bornDate" type="date" required name="bornDate" placeholder="ano de nascimento"/>
                    <button type="submit"><h1>CADASTRAR</h1></button>
                </form>
            </div>
        </div>
    )
}

export default Register