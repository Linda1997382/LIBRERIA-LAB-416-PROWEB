import sql from 'mssql'; // Importa el paquete 'mssql' para interactuar con la base de datos SQL Server
import config from '../config'; // Importa la configuración de la base de datos desde el archivo de configuración

// Configuración de las credenciales y detalles de conexión a la base de datos
const dbsettings = {
    user: config.dbUser, // Nombre de usuario para acceder a la base de datos
    password: config.dbPassword, // Contraseña para el usuario de la base de datos
    server: config.dbServer, // Servidor de la base de datos
    database: config.dbDatabase, // Nombre de la base de datos
    options: {
        encrypt: true, // Opción para encriptar la comunicación con la base de datos
        trustServerCertificate: true, // Permite confiar en el certificado del servidor
    },
};

// Función para establecer la conexión a la base de datos
export async function getConnection() {
    try {
        const pool = await sql.connect(dbsettings); // Crea un pool de conexiones usando la configuración definida
        return pool; 
    } catch (error) {
        console.error(error); 
    }
}

export { sql }; // Exporta el módulo 'sql' para ser utilizado en otras partes del código