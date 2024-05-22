import { Router } from 'express';
import { getConnection } from '../database/database.js';

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const connection = await getConnection();
        const result = await connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        res.json({ id: result[0].insertId, name, email, password });
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

export default router;
