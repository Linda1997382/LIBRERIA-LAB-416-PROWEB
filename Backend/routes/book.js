import { Router } from 'express';
import { getConnection } from '../database/database.js';

const router = Router();

// Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM libro');
    res.json(rows);
    connection.end(); // Cierra la conexión después de la consulta
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Obtener un libro por su ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM libro WHERE ID = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Libro no encontrado' });
    } else {
      res.json(rows[0]);
    }
    connection.end(); // Cierra la conexión después de la consulta
  } catch (error) {
    console.error('Error al obtener libro por ID:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Crear un nuevo libro
router.post('/', async (req, res) => {
  try {
    const { Titulo, AutorID, EditorialID, Precio, Descripcion, CategoriaID, Imagen, Link } = req.body;
    const connection = await getConnection();
    const [result] = await connection.query(
      'INSERT INTO libro (Titulo, AutorID, EditorialID, Precio, Descripcion, CategoriaID, Imagen, Link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [Titulo, AutorID, EditorialID, Precio, Descripcion, CategoriaID, Imagen, Link]
    );
    res.status(201).json({ id: result.insertId, Titulo, AutorID, EditorialID, Precio, Descripcion, CategoriaID, Imagen, Link });
    connection.end(); // Cierra la conexión después de la consulta
  } catch (error) {
    console.error('Error al crear libro:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Actualizar un libro por su ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Titulo, AutorID, EditorialID, Precio, Descripcion, CategoriaID, Imagen, Link } = req.body;
    const connection = await getConnection();
    const result = await connection.query(
      'UPDATE libro SET Titulo = ?, AutorID = ?, EditorialID = ?, Precio = ?, Descripcion = ?, CategoriaID = ?, Imagen = ?, Link = ? WHERE ID = ?',
      [Titulo, AutorID, EditorialID, Precio, Descripcion, CategoriaID, Imagen, Link, id]
    );
    if (result[0].affectedRows === 0) {
      res.status(404).json({ message: 'Libro no encontrado' });
    } else {
      res.json({ id, Titulo, AutorID, EditorialID, Precio, Descripcion, CategoriaID, Imagen, Link });
    }
    connection.end(); // Cierra la conexión después de la consulta
  } catch (error) {
    console.error('Error al actualizar libro por ID:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Eliminar un libro por su ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query('DELETE FROM libro WHERE ID = ?', [id]);
    if (result[0].affectedRows === 0) {
      res.status(404).json({ message: 'Libro no encontrado' });
    } else {
      res.json({ message: 'Libro eliminado correctamente' });
    }
    connection.end(); // Cierra la conexión después de la consulta
  } catch (error) {
    console.error('Error al eliminar libro por ID:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;
