/*Este archivo de configuración utilizando 
dotenv carga y gestiona las variables de entorno necesarias para la aplicación.*/

import { config } from "dotenv"
config();

//Aqui exportamos todas las variables de entorno que vamos a utilizar para iniciar sesion en la Base de Datos

export default{
    port: process.env.PUERTO || 3000,
    dbUser: process.env.DB_USER || '',
    dbServer: process.env.DB_SERVER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || '',
} 