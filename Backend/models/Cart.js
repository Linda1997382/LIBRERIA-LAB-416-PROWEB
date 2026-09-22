import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  UsuarioID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  LibroID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  Cantidad: { type: Number, required: true, default: 1 }
});

export default mongoose.model('Cart', cartSchema);
