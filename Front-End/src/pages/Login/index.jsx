import React, { Component } from 'react';
import {useNavigate} from "react-router";
import {Link} from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    React.useEffect(() => {
        async function authUser(userLogin, userPassword) {
            const response = await axios.put("http://localhost:3333/auth", {
                login: userLogin,
                password: userPassword,
            });
            return response.data;
        }

        async function verifyUserExistence(userLogin){
            const response = await axios.put("http://localhost:3333/auth/verifyUser",{
                login: userLogin,
            });
            return response.data;
        }

        async function getCompanyAndUserId(userLogin, userPassword){
            const response = await axios.put("http://localhost:3333/Login/getCompanyAndUserId",{
                login: userLogin,
                password: userPassword,
            });
            return response.data;
        }

        function isEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex.test(email)) {
                return true; // Email válido
            } else {
                return false; // Email inválido
            }
        }

        const form = document.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.querySelector('.email').value;
            const password = document.querySelector('.password').value;
            console.log('antes da verificaçao')

            if(isEmail(email)){
                authUser(email, password).then(response =>{
                    if(response){
                        getCompanyAndUserId(email, password).then(response =>{
                            if (response.company_id == null){
                                navigate(`/Register/Company/${response.id}`)
                            }
                            else{
                                navigate(`/Home/${response.company_id}/${response.id}`);
                            }
                        })
                    }
                    else{
                        verifyUserExistence(email).then(response =>{
                            if(!response){
                                navigate('/Register');
                            }
                            else {
                                window.alert('email ou senha incorreta');
                            }
                        })
                    }
                })} else {
                window.alert('digite um email válido');
            }
        })
    }, []);

    return (
        <div id="box">
            <div id="loginForm">
                <h1>SEJA BEM-VINDO</h1>
                <form action="">
                    <input className="email" type="text" required name="email" placeholder="Email"/>
                    <input className="password" type="text" required name="password" placeholder="Senha"/>
                    <button type="submit" id='loginBtn'><h1>ENTRAR</h1></button>
                </form>
                <Link to={'/Register'} id='registerLink'><h4>CRIAR CONTA</h4></Link>
            </div>
        </div>
    )
}

export default Login
