import React, { Component } from 'react';
import {useNavigate} from "react-router";
import './companyRegister.css';
import axios from 'axios';

function CompanyRegister (){
    const navigate = useNavigate();

    React.useEffect(() =>{

    },[])

    return (
        <div id="box">
            <div id='registerUserForm'>
                <h1>REGISTRAR EMPRESA</h1>
                <form action="">
                    <input className="CNPJ" type="text" required name="CNPJ" placeholder="CNPJ DA EMPRESA"/>
                    <button type="submit"><h1>CADASTRAR</h1></button>
                </form>
            </div>
        </div>
    )

}

export default CompanyRegister;