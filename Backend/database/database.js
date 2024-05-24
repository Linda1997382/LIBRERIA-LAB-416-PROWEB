import mysql from 'mysql2/promise';
import config from '../config.js';

const dbsettings = {
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
};

async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbsettings);
    console.log("Connected to the database!");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    throw error; // Lanzar el error para manejarlo correctamente en las rutas
  }
}

export { getConnection, mysql };
