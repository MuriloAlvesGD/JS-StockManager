import pkg from 'pg';
const {Pool} = pkg;


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'postgres',
    port: 5432 // Porta padrão do PostgreSQL
});

pool.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao PostgreSQL:', err);
        return;
    }
    console.log('Conectado ao PostgreSQL!');
});

export default {
    query: (text, params) => pool.query(text, params),
};
