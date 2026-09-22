import mongoose from 'mongoose';

const editorialSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  Sede: { type: String },
  Fundacion: { type: Date },
  Descripcion: { type: String }
});

export default mongoose.model('Editorial', editorialSchema);
