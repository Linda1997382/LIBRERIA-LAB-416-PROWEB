import express from 'express';
import Sale from '../models/Sale.js';

const router = express.Router();

// Obtener todas las ventas de un libro por su ID
router.get('/libro/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const ventas = await Sale.find({ LibroID: id }).populate('LibroID');
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las ventas del libro' });
  }
});

// Ruta para registrar una nueva venta
router.post('/', async (req, res) => {
  const { VentaID, LibroID, Cantidad, Precio } = req.body;

  try {
    const newSale = new Sale({ VentaID, LibroID, Cantidad, Precio });
    await newSale.save();
    res.status(201).json({ message: 'Venta registrada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar la venta' });
  }
});
export default router;
