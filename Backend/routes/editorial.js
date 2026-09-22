import express from 'express';
import Editorial from '../models/Editorial.js';

const router = express.Router();

// Obtener todas las editoriales
router.get('/', async (req, res) => {
  try {
    const editoriales = await Editorial.find({}, '_id Nombre Sede Fundacion Descripcion');
    res.status(200).json(editoriales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las editoriales' });
  }
});

// Agregar una nueva editorial
router.post('/', async (req, res) => {
  const { Nombre, Sede, Fundacion, Descripcion } = req.body;

  try {
    const newEditorial = new Editorial({ Nombre, Sede, Fundacion, Descripcion });
    await newEditorial.save();
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
    const deletedEditorial = await Editorial.findByIdAndDelete(id);

    if (!deletedEditorial) {
      return res.status(404).json({ message: 'Editorial no encontrada' });
    }

    res.status(200).json({ message: 'Editorial eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la editorial' });
  }
});

export default router;
