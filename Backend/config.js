import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  dbServer: process.env.DB_SERVER || 'localhost',
  dbPort: process.env.DB_PORT || 3307, // Cambia el puerto aquí
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || 'lucin12345',
  dbDatabase: process.env.DB_DATABASE || 'libreria',
};

export default config;

