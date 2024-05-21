import express from 'express';
import config from './config.js';

const app = express();

// Configuraciones
app.set('port', config.port);

// Middlewares
app.use(express.json());

// Rutas (aquí defines tus rutas)

// Exporta la aplicación configurada
export default app;
