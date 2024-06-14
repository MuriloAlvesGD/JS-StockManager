const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'postgres@localhost',
    port: 5432 // Porta padrão do PostgreSQL
});

client.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao PostgreSQL:', err);
        return;
    }
    console.log('Conectado ao PostgreSQL!');
});

module.exports = client;
