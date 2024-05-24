import express from 'express';
import config from './config.js';
import usersRoutes from './routes/users.js';
import bookRoutes from './routes/book.js';
import cors from 'cors';

const app = express();

// Configuraciones
app.set('port', config.port);

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/users', usersRoutes);
app.use('/api/books', bookRoutes);

// Exporta la aplicación configurada
export default app;
