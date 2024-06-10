import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Obtener todas las editoriales
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT ID, Nombre, Sede, Fundacion, Descripcion FROM Editorial');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las editoriales' });
  }
});

// Agregar una nueva editorial
router.post('/', async (req, res) => {
  const { Nombre, Sede, Fundacion, Descripcion } = req.body;

  try {
    await pool.query('INSERT INTO Editorial (Nombre, Sede, Fundacion, Descripcion) VALUES (?, ?, ?, ?)', [Nombre, Sede, Fundacion, Descripcion]);
    res.status(201).json({ message: 'Editorial agregada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la editorial' });
  }
});

// Eliminar una editorial
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM Editorial WHERE ID = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Editorial no encontrada' });
    }

    res.status(200).json({ message: 'Editorial eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la editorial' });
  }
});

export default router;
