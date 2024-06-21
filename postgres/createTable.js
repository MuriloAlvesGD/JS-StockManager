const db = require('./db');

const createSchema = async() => {
    try {
        await db.query(`
      CREATE SCHEMA IF NOT EXISTS STOCK_MANAGER
    `);
        console.log('schema STOCK_MANAGER criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar o schema STOCK_MANAGER:', err);
    }
};

const createAdressTable = async () => {
    try {
        await db.query(`
        CREATE TABLE IF NOT EXISTS STOCK_MANAGER.adress (
            id SERIAL PRIMARY KEY,
            CEP VARCHAR(8) NOT NULL,
            street VARCHAR(100),
            number VARCHAR(35),
            district VARCHAR(100) NOT NULL,
            city VARCHAR(50) NOT NULL,
            UF CHAR(2) NOT NULL,
            complement VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
    `);
        console.log('Tabela de ADRESS criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar a tabela de ADRESS:', err);
    }
};

const createCompanyTable = async () => {
    try {
        await db.query(`
        CREATE TABLE IF NOT EXISTS STOCK_MANAGER.companys (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            reason VARCHAR(255) UNIQUE NOT NULL,
            CNPJ VARCHAR(14) UNIQUE NOT NULL,
            adress_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_adress FOREIGN KEY (adress_id)
        REFERENCES STOCK_MANAGER.adress(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        );
    `);
        console.log('Tabela de COMPANYS criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar a tabela de COMPANYS:', err);
    }
};

const createSellerTable = async () => {
    try {
        await db.query(`
        CREATE TABLE IF NOT EXISTS STOCK_MANAGER.sellers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            CPF VARCHAR(11) UNIQUE NOT NULL,
            RG VARCHAR(12) UNIQUE NOT NULL,
            gender VARCHAR(20),
            login VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            acess_level INT NULL,
            situation BOOLEAN NOT NULL,
            born_date DATE,
            company_id INT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_company FOREIGN KEY (company_id)
        REFERENCES STOCK_MANAGER.companys(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        );
    `);
        console.log('Tabela de SELLERS criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar a tabela de SELLERS:', err);
    }
};

const createStockTable = async () => {
    try {
        await db.query(`
        CREATE TABLE IF NOT EXISTS STOCK_MANAGER.stocks (
            id SERIAL PRIMARY KEY,
            company_id INT NOT NULL,
            adress_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_adress FOREIGN KEY (adress_id)
        REFERENCES STOCK_MANAGER.adress(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
            ,
            CONSTRAINT fk_company FOREIGN KEY (company_id)
        REFERENCES STOCK_MANAGER.companys(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        );
    `);
        console.log('Tabela de STOCKS criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar a tabela de STOCKS:', err);
    }
};

const createPurchasesTable = async () => {
    try {
        await db.query(`
        CREATE TABLE IF NOT EXISTS STOCK_MANAGER.purchases (
            id SERIAL PRIMARY KEY,
            seller_id INT NOT NULL,
            stock_id INT NOT NULL,
            cost FLOAT,
            discount FLOAT,
            finalCost FLOAT NOT NULL,
            purchaseDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_stock FOREIGN KEY (stock_id)
        REFERENCES STOCK_MANAGER.stocks(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
            ,
            CONSTRAINT fk_seller FOREIGN KEY (seller_id)
        REFERENCES STOCK_MANAGER.sellers(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        );
    `);
        console.log('Tabela de PURCHASES criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar a tabela de PURCHASES:', err);
    }
};

const createProductsTable = async () => {
    try {
        await db.query(`
        CREATE TABLE IF NOT EXISTS STOCK_MANAGER.products (
            id SERIAL PRIMARY KEY,
            company_id INT NOT NULL,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(255),
            cost FLOAT NOT NULL,
            price FLOAT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_company FOREIGN KEY (company_id)
        REFERENCES STOCK_MANAGER.companys(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        );
    `);
        console.log('Tabela de PRODUCTS criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar a tabela de PRODUCTS:', err);
    }
};

const createSalesTable = async () => {
    try {
        await db.query(`
        CREATE TABLE IF NOT EXISTS STOCK_MANAGER.sales (
            id SERIAL PRIMARY KEY,
            seller_id INT NOT NULL,
            shipping_adress INT NOT NULL,
            value FLOAT,
            discount FLOAT,
            totalValue FLOAT NOT NULL,
            buyer_Name VARCHAR(100) NOT NULL,
            buyer_Doc VARCHAR(14) NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_shipping_adress FOREIGN KEY (shipping_adress)
        REFERENCES STOCK_MANAGER.adress(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
            ,
            CONSTRAINT fk_seller FOREIGN KEY (seller_id)
        REFERENCES STOCK_MANAGER.sellers(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        );
    `);
        console.log('Tabela de SALES criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar a tabela de SALES:', err);
    }
};

const createStockProductTable = async () => {
    try {
        await db.query(`
        CREATE TABLE IF NOT EXISTS STOCK_MANAGER.stock_product (
            stock_id INT NOT NULL,
            product_id INT NOT NULL,
            productQuantity INT,
            PRIMARY KEY (stock_id, product_id),
            FOREIGN KEY (product_id) REFERENCES STOCK_MANAGER.products(id),
            FOREIGN KEY (stock_id) REFERENCES STOCK_MANAGER.stocks(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log('Tabela de STOCK_PRODUCT criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar a tabela de STOCK_PRODUCT:', err);
    }
};

const createPurchaseProductTable = async () => {
    try {
        await db.query(`
        CREATE TABLE IF NOT EXISTS STOCK_MANAGER.purchase_product (
            purchase_id INT NOT NULL,
            product_id INT NOT NULL,
            product_quantity INT NOT NULL,
            product_cost FLOAT NOT NULL,
            PRIMARY KEY (purchase_id, product_id),
            FOREIGN KEY (product_id) REFERENCES STOCK_MANAGER.products(id),
            FOREIGN KEY (purchase_id) REFERENCES STOCK_MANAGER.purchases(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log('Tabela de PURCHASE_PRODUCT criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar a tabela de PURCHASE_PRODUCT:', err);
    }
};

const createSellerSaleProductTable = async () => {
    try {
        await db.query(`
        CREATE TABLE IF NOT EXISTS STOCK_MANAGER.seller_sale_product (
            product_id INT NOT NULL,
            seller_id INT NOT NULL,
            sale_id INT NOT NULL,
            quantity INT NOT NULL,
            price FLOAT,
            discount FLOAT,
            final_price FLOAT NOT NULL,
            PRIMARY KEY (product_id, sale_id, seller_id),
            FOREIGN KEY (product_id) REFERENCES STOCK_MANAGER.products(id),
            FOREIGN KEY (sale_id) REFERENCES STOCK_MANAGER.sales(id),
            FOREIGN KEY (seller_id) REFERENCES STOCK_MANAGER.sellers(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log('Tabela de SELLER_SALE_PRODUCT criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar a tabela de SELLER_SALE_PRODUCT:', err);
    }
};

createSchema();
createAdressTable();
createCompanyTable();
createSellerTable();
createStockTable();
createPurchasesTable();
createProductsTable();
createSalesTable();
createStockProductTable();
createPurchaseProductTable();
createSellerSaleProductTable();
