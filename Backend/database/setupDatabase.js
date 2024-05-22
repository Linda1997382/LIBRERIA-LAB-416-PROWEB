// setupDatabase.js
import mysql from 'mysql2/promise'; // Utilizamos la versión Promise de mysql2
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import config from '../config.js'; // Importamos la configuración de la base de datos desde config.js

const connection = await mysql.createConnection({
  host: config.dbServer,
  port: config.dbPort,
  user: config.dbUser,
  password: config.dbPassword,
  multipleStatements: true
});

(async () => {
  try {
    const sql = await readFile(resolve(__dirname, './create_database.sql'), 'utf8');

    // Conexión a la base de datos
    console.log('Conectado a la base de datos MySQL');

    // Ejecutar el script SQL
    await connection.query(sql);
    console.log('Base de datos creada y configurada');

    // Cerrar la conexión
    await connection.end();
    console.log('Conexión cerrada');
  } catch (error) {
    console.error('Error al configurar la base de datos: ', error);
  }
})();
