const mysql = require('mysql2/promise');
const config = require('../config');

const dbsettings = {
    host: config.dbServer,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase,
};

async function getConnection() {
    try {
        const connection = await mysql.createConnection(dbsettings);
        console.log("Connected to the database!");
        return connection;
    } catch (error) {
        console.error("Error connecting to the database: ", error);
    }
}

module.exports = { getConnection, mysql };
