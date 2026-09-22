import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  VentaID: { type: String },
  LibroID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  Cantidad: { type: Number, required: true },
  Precio: { type: Number, required: true },
  FechaVenta: { type: Date, default: Date.now }
});

export default mongoose.model('Sale', saleSchema);
