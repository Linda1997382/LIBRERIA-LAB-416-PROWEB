// config.js
import { config } from 'dotenv';
config();

// Aquí exportamos todas las variables de entorno que vamos a utilizar para iniciar sesión en la Base de Datos
export default {
    port: process.env.PUERTO || 3000,
    dbUser: process.env.DB_USER || 'root',
    dbServer: process.env.DB_SERVER || '127.0.0.1',
    dbPassword: process.env.DB_PASSWORD || 'lucin12345',
    dbDatabase: process.env.DB_DATABASE || 'libreria',
};