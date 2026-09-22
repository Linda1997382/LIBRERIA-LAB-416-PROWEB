import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
});

// Agregar una nueva categoría
router.post('/', async (req, res) => {
  const { nombre } = req.body;

  try {
    const newCategory = new Category({ Nombre: nombre });
    const savedCategory = await newCategory.save();
    res.status(201).json({ message: 'Categoría agregada exitosamente', id: savedCategory._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la categoría' });
  }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la categoría' });
  }
});

export default router;
