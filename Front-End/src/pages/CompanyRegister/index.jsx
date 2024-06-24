import React, { Component } from 'react';
import {useNavigate} from "react-router";
import './companyRegister.css';
import axios from 'axios';

function CompanyRegister (){
    const navigate = useNavigate();

    React.useEffect(() =>{
        document.querySelector('#companyInformations').style.display = 'none';

        async function getRegisterCompany (companyCNPJ){
            const response = await axios.put("http://localhost:3333/auth/Register/Company", {
                CNPJ: companyCNPJ,
            });
            return response.data;
        }

        async function updateCompanyFK(companyId, sellerId) {
            const response = await axios.put("http://localhost:3333/Register/CompanyFK",{
                companyId: companyId,
                sellerId: sellerId,
            })

            return response.data;
        }

        const button = document.querySelector("#submitBtn");
        button.onclick = function(){

            const companyInformations = document.querySelector('#companyInformations');
            companyInformations.innerHTML = '';

            const CNPJ = document.querySelector('.CNPJ');

            getRegisterCompany(CNPJ.value).then(response => {
                if (typeof response == "object"){
                    if(!companyInformations.querySelector('#CompanyName')){
                        const nameElement = document.createElement('h3');
                        const reasonElement = document.createElement('h3');
                        const CNPJElement = document.createElement('h3');
                        const selectCompany = document.createElement('button');

                        selectCompany.id = 'selectCompany';
                        nameElement.id = 'CompanyName';
                        reasonElement.id = 'CompanyReason';
                        CNPJElement.id = 'CompanyCNPJ';

                        selectCompany.innerText = 'CONFIRM';
                        nameElement.innerText = 'NOME: ' + response.name;
                        reasonElement.innerText = 'RAZAO SOCIAL: ' + response.reason;
                        CNPJElement.innerText = 'CNPJ: ' + response.cnpj;

                        companyInformations.appendChild(nameElement);
                        companyInformations.appendChild(reasonElement);
                        companyInformations.appendChild(CNPJElement);
                        companyInformations.appendChild(selectCompany);
                        companyInformations.style.display = 'block';
                        CNPJ.value = '';

                        const companyId = response.id;

                        selectCompany.onclick = function (){
                            let url = window.location.pathname;
                            let parts = url.split('/');
                            const sellerId = parts[parts.length -1];
                            updateCompanyFK(companyId, sellerId).then(response =>{
                                window.alert(response);
                                navigate("/");
                            });
                        }
                    }
                }

                else {
                    companyInformations.innerHTML = "Empresa nao encotrada";
                    companyInformations.style.display = 'block';
                }
            })
            const form = document.querySelector("form");
            form.reset();
        }


    },[])
    return (
        <div id="box">
            <div id='registerUserForm'>
                <h1>REGISTRAR EMPRESA</h1>
                <form action="">
                    <input className="CNPJ" type="text" required name="CNPJ" placeholder="CNPJ DA EMPRESA"/>
                </form>
                <button id='submitBtn'><h1>CADASTRAR</h1></button>
            </div>
            <div id='companyInformations'></div>
        </div>
    )

}

export default CompanyRegister;