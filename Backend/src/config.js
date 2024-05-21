const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PUERTO || 3000,
    dbUser: process.env.DB_USER || 'root',
    dbServer: process.env.DB_SERVER || '127.0.0.1',
    dbPassword: process.env.DB_PASSWORD || 'lucin12345',
    dbDatabase: process.env.DB_DATABASE || 'libreria',
};
