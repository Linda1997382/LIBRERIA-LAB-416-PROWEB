import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// Obtener los items del carrito de un usuario
router.get('/:usuarioID', async (req, res) => {
  const { usuarioID } = req.params;
  try {
    const items = await Cart.find({ UsuarioID: usuarioID }).populate('LibroID');
    res.json(items);
  } catch (error) {
    console.error('Error al obtener items del carrito:', error);
    res.status(500).json({ message: 'Error al obtener items del carrito' });
  }
});

// Agregar un libro al carrito
router.post('/', async (req, res) => {
  const { usuarioID, libroID, cantidad } = req.body;
  try {
    let cartItem = await Cart.findOne({ UsuarioID: usuarioID, LibroID: libroID });
    
    if (cartItem) {
      cartItem.Cantidad += cantidad;
      await cartItem.save();
    } else {
      cartItem = new Cart({ UsuarioID: usuarioID, LibroID: libroID, Cantidad: cantidad });
      await cartItem.save();
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
    await Cart.findOneAndDelete({ UsuarioID: usuarioID, LibroID: libroID });
    res.json({ message: 'Libro eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar libro del carrito:', error);
    res.status(500).json({ message: 'Error al eliminar libro del carrito' });
  }
});

export default router;
