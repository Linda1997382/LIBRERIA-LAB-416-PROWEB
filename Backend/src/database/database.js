import mysql from 'mysql2/promise'; // Importa el paquete 'mysql2/promise' para interactuar con la base de datos MySQL
import config from '../config'; // Importa la configuración de la base de datos desde el archivo de configuración

// Configuración de las credenciales y detalles de conexión a la base de datos
const dbsettings = {
    host: config.dbServer, // Servidor de la base de datos
    user: config.dbUser, // Nombre de usuario para acceder a la base de datos
    password: config.dbPassword, // Contraseña para el usuario de la base de datos
    database: config.dbDatabase, // Nombre de la base de datos
};

// Función para establecer la conexión a la base de datos
export async function getConnection() {
    try {
        const connection = await mysql.createConnection(dbsettings); // Crea una conexión usando la configuración definida
        console.log("Connected to the database!"); // Mensaje de éxito
        return connection;
    } catch (error) {
        console.error("Error connecting to the database: ", error); // Muestra el error en caso de fallo
    }
}

export { mysql }; // Exporta el módulo 'mysql' para ser utilizado en otras partes del código