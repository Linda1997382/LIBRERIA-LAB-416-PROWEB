import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categoria');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
});

// Agregar una nueva categoría
router.post('/', async (req, res) => {
  const { nombre } = req.body;

  try {
    const [result] = await pool.query('INSERT INTO categoria (Nombre) VALUES (?)', [nombre]);
    res.status(201).json({ message: 'Categoría agregada exitosamente', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la categoría' });
  }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM categoria WHERE ID = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la categoría' });
  }
});

export default router;
