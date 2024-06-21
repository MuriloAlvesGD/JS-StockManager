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
        auth: false,
    }

    result.rows.forEach(element =>{
        if (element.login != null && element.login != undefined && element.login != ''){
            object.errorMensage = object.errorMensage + ' Email em USO ';
        }
        if (element.CPF != null && element.CPF != undefined && element.CPF != ''){
            object.errorMensage = object.errorMensage + ' CPF em USO ';
        }
        if (element.RG != null && element.RG != undefined && element.RG != ''){
            object.errorMensage = object.errorMensage + ' RG em USO ';
        }
    })

    if (object.errorMensage == ''){
        object.auth = true;
    }

    return response.status(200).json(object);
})

export default routes;