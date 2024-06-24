import express from 'express';
import db from '../postgres/db.js';
import response from 'express';
const routes = express.Router();

routes.put('/auth', async (request, response) =>{
    const {login, password} = request.body;
    const result = await db.query(`SELECT login,password FROM stock_manager.sellers where login = $1 and password = $2`,[login, password]);
    const object = result.rows[0] != null && result.rows[0] != undefined && result.rows[0] != '' ? true : false;
    return response.status(200).json(object);
})

routes.put('/auth/verifyUser', async (request, response) =>{
    const {login} = request.body;
    const result = await db.query(`SELECT login FROM stock_manager.sellers where login = $1`,[login]);
    const object = result.rows[0] != null && result.rows[0] != undefined && result.rows[0] != '' ? true : false;
    return response.status(200).json(object);
})

routes.put('/auth/Docs/Register', async(request, response) => {
    const {login, CPF, RG} = request.body;
    const result = await db.query(`SELECT login, CPF, RG FROM stock_manager.sellers where login = $1 OR CPF = $2 OR RG = $3`, [login, CPF, RG]);

    const object = {
        errorMensage: '',
        auth: true,
    }

    let a = '';
    let b = '';
    let c = '';

    result.rows.forEach(element =>{
        if (element.login != null && element.login != undefined && element.login != ''){
            a = 'Email em USO ';
            object.auth = false;
        }
        if (element.cpf != null && element.cpf != undefined && element.cpf != ''){
            b = 'CPF em USO ';
            object.auth = false;
        }
        if (element.rg != null && element.rg != undefined && element.rg != ''){
            c = 'RG em USO ';
            object.auth = false;
        }
    })

    object.errorMensage = a + ' | ' + b + ' | ' + c;

    return response.status(200).json(object);
})

routes.put('/auth/Register/Company', async(request, response) => {
    const {CNPJ} = request.body;
    const result = await db.query(`SELECT id, name, reason, cnpj FROM stock_manager.companys where cnpj = $1`, [CNPJ]);
    let object = undefined;

    if (result.rows[0] != null) {
        object = result.rows[0];
    }

    return response.status(200).json(object);
})

routes.post('/Register/NewUser', async(request, response) =>{
    const {userData} = request.body;
    await db.query(`INSERT INTO stock_manager.sellers (name, cpf, rg, gender, login, password, acess_level, situation, born_date, company_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,[userData.name, userData.CPF, userData.RG, userData.gender, userData.login, userData.password, userData.acessLevel, userData.situation, userData.bornDate, userData.company_id]);
    const result = await db.query(`SELECT id FROM stock_manager.sellers WHERE cpf = $1`, [userData.CPF]);
    return response.status(201).json(result.rows[0]);
})

routes.get('/Register/getSellerId', async(request, response) => {
    const {CPF} = request.body;
    const result = await db.query(`SELECT id FROM stock_manager.sellers WHERE cpf = $1`, [CPF]);
    return response.status(201).json(result);
})

routes.put('/Login/getCompanyAndUserId', async(request, response) => {
    const {login, password} = request.body;
    const result = await db.query(`SELECT id, company_id FROM stock_manager.sellers where login = $1 and password = $2`,[login, password]);
    return response.status(200).json(result.rows[0]);
})

routes.put('/Register/CompanyFK', async(request, response) =>{
    const {companyId, sellerId} = request.body;
    const result = await db.query(`UPDATE stock_manager.sellers SET company_id = $1 where id = $2`, [companyId, sellerId]);

    return response.status(200).json('company register into seller row');
})

export default routes;