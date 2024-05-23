import dotenv from 'dotenv';
dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  server: {
    port: process.env.PORT || 3000,
  },
};

export default config;
