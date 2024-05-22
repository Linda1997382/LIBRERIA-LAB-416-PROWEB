import express from 'express';
import config from './config.js';
import usersRoutes from './routes/users.js';

const app = express();

// Configuraciones
app.set('port', config.port);

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/users', usersRoutes);

// Exporta la aplicación configurada
export default app;
