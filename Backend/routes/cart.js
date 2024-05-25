import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Obtener los items del carrito de un usuario
router.get('/:usuarioID', async (req, res) => {
  const { usuarioID } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM carrito WHERE UsuarioID = ?', [usuarioID]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener items del carrito:', error);
    res.status(500).json({ message: 'Error al obtener items del carrito' });
  }
});

// Agregar un libro al carrito
router.post('/', async (req, res) => {
  const { usuarioID, libroID, cantidad } = req.body;
  try {
    // Verificar si el libro ya está en el carrito
    const [existingRows] = await pool.query('SELECT * FROM carrito WHERE UsuarioID = ? AND LibroID = ?', [usuarioID, libroID]);
    if (existingRows.length > 0) {
      // Actualizar la cantidad si el libro ya está en el carrito
      await pool.query('UPDATE carrito SET Cantidad = Cantidad + ? WHERE UsuarioID = ? AND LibroID = ?', [cantidad, usuarioID, libroID]);
    } else {
      // Agregar el libro al carrito si no está presente
      await pool.query('INSERT INTO carrito (UsuarioID, LibroID, Cantidad) VALUES (?, ?, ?)', [usuarioID, libroID, cantidad]);
    }
    res.status(201).json({ message: 'Libro agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar libro al carrito:', error);
    res.status(500).json({ message: 'Error al agregar libro al carrito' });
  }
});

// Eliminar un libro del carrito
router.delete('/:usuarioID/:libroID', async (req, res) => {
  const { usuarioID, libroID } = req.params;
  try {
    await pool.query('DELETE FROM carrito WHERE UsuarioID = ? AND LibroID = ?', [usuarioID, libroID]);
    res.json({ message: 'Libro eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar libro del carrito:', error);
    res.status(500).json({ message: 'Error al eliminar libro del carrito' });
  }
});

// Exportar el router
export default router;
