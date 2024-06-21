const db = require('./db');

async function verifyUser(email, password) {
    try {
        const result = await db.query(`SELECT login,password FROM stock_manager.sellers where login=$1`, [email]);
        let object = result.rows[0];
        if (object !== undefined && object !== null) {
            if (object.password == password){
                return true;
            }
            else {
                return false;
            }
        }
        else {
            console.log(`a verificaçao retornou nulo`);
            return false;
        }
    } catch (error) {
        console.error(`Erro na verificaçao:`, error);
        throw error;
    }
}

module.exports = {verifyUser};