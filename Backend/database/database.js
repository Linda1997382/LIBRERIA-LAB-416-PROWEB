import mysql from 'mysql2/promise';
import config from '../config.js';

const dbsettings = {
  host: config.dbServer,
  port: config.dbPort, // Asegúrate de incluir el puerto aquí
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

export { getConnection, mysql };

