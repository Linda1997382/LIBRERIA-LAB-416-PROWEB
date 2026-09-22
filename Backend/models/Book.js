import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  Titulo: { type: String, required: true },
  AutorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  EditorialID: { type: mongoose.Schema.Types.ObjectId, ref: 'Editorial' },
  Precio: { type: Number, required: true },
  Descripcion: { type: String },
  CategoriaID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  Imagen: { type: String },
  Link: { type: String }
});

export default mongoose.model('Book', bookSchema);
