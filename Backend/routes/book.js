import { Router } from 'express';
import Book from '../models/Book.js';

const router = Router();

// Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('AutorID').populate('EditorialID').populate('CategoriaID');
    res.json(books);
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Obtener un libro por su ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate('AutorID').populate('EditorialID').populate('CategoriaID');
    if (!book) {
      res.status(404).json({ message: 'Libro no encontrado' });
    } else {
      res.json(book);
    }
  } catch (error) {
    console.error('Error al obtener libro por ID:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Crear un nuevo libro
router.post('/', async (req, res) => {
  try {
    const { Titulo, AutorID, EditorialID, Precio, Descripcion, CategoriaID, Imagen, Link } = req.body;
    
    const newBook = new Book({
      Titulo, AutorID, EditorialID, Precio, Descripcion, CategoriaID, Imagen, Link
    });
    
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error al crear libro:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Actualizar un libro por su ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedBook) {
      res.status(404).json({ message: 'Libro no encontrado' });
    } else {
      res.json(updatedBook);
    }
  } catch (error) {
    console.error('Error al actualizar libro por ID:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Eliminar un libro por su ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    
    if (!deletedBook) {
      res.status(404).json({ message: 'Libro no encontrado' });
    } else {
      res.json({ message: 'Libro eliminado correctamente' });
    }
  } catch (error) {
    console.error('Error al eliminar libro por ID:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;
