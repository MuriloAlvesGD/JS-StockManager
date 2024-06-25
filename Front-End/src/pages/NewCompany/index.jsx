import './NewCompany.css'
import React from "react";
import {useNavigate} from "react-router";
import axios from "axios";

function NewCompany(){
    const navigate = useNavigate();
    let url = window.location.pathname;
    let parts = url.split('/');
    const sellerId = parts[parts.length -1];

    React.useEffect(() => {
        async function getRegisterCompany (companyCNPJ){
            const response = await axios.put("http://localhost:3333/auth/Register/Company", {
                CNPJ: companyCNPJ,
            });
            return response.data;
        }

        async function registerNewCompanyAndAdress (userId, name, reason, CNPJ, CEP, street, number, district,city, UF, complement){
            const response = await axios.post('http://localhost:3333/Register/NewCompanyAndAdress',{
                userId: userId,
                name: name,
                reason: reason,
                CNPJ: CNPJ,
                CEP: CEP,
                street: street,
                number: number,
                district: district,
                city: city,
                UF: UF,
                complement: complement,
            })

            return response.data;
        }

        const submitBtn = document.querySelector('#submitBtn');
        submitBtn.onclick = () => {
            const name = document.querySelector('.name').value;
            const reason = document.querySelector('.reason').value;
            const CNPJ = document.querySelector('.CNPJ').value;
            const CEP = document.querySelector('.CEP').value;
            const street = document.querySelector('.street').value;
            const number = document.querySelector('.number').value;
            const district = document.querySelector('.district').value;
            const city = document.querySelector('.city').value;
            const UF = document.querySelector('.UF').value;
            const complement = document.querySelector('.complement').value;

            getRegisterCompany(CNPJ).then(response => {
                if (response.cnpj != null){
                    window.alert(`CNPJ já está em uso\nAssociado a: ${response.name}`)
                }
                else{
                    registerNewCompanyAndAdress (sellerId, name, reason, CNPJ, CEP, street, number, district,city, UF, complement).then(response => {
                        navigate(`/Home/${response[0]}/${response[1]}`);
                    });
                }
            })
            const forms = document.querySelectorAll("form");
            forms[0].reset();
            forms[1].reset();
        }
    },[])


    return(
        <div id='box'>
            <div className='form'>
                <h3>EMPRESA</h3>
                <form action="">
                    <input className="name" type="text" required name="name" placeholder="NOME DA EMPRESA"/>
                    <input className="reason" type="text" required name="reason" placeholder="RAZAO SOCIAL"/>
                    <input className="CNPJ" type="text" required name="CNPJ" placeholder="CNPJ DA EMPRESA"/>
                </form>
            </div>
            <div className='form'>
                <h3>ENDEREÇO</h3>
                <form action="">
                    <input className="CEP" type="text" required name="CEP" placeholder="CEP"/>
                    <input className="street" type="text" name="street" placeholder="RUA"/>
                    <input className="number" type="text" name="number" placeholder="NUMERO"/>
                    <input className="district" type="text" required name="district" placeholder="BAIRRO"/>
                    <input className="city" type="text" required name="city" placeholder="CIDADE"/>
                    <input className="UF" type="text" required name="UF" placeholder="ESTADO"/>
                    <input className="complement" type="text" name="complement" placeholder="COMPLEMENTO"/>
                </form>
            </div>
            <button id='submitBtn'><h1>CADASTRAR</h1></button>
        </div>
    )

}

export default NewCompany;