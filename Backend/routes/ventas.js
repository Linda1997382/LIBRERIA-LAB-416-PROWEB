import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Obtener todas las ventas de un libro por su ID
router.get('/libro/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM ventadetalle WHERE LibroID = ?', [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las ventas del libro' });
  }
});

// Ruta para registrar una nueva venta
router.post('/', async (req, res) => {
  const { VentaID, LibroID, Cantidad, Precio } = req.body;

  try {
    await pool.query('INSERT INTO ventadetalle (VentaID, LibroID, Cantidad, Precio) VALUES (?, ?, ?, ?)', [VentaID, LibroID, Cantidad, Precio]);
    res.status(201).json({ message: 'Venta registrada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar la venta' });
  }
});
export default router;
