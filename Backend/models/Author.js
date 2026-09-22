import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  Nacionalidad: { type: String },
  FechaNacimiento: { type: Date },
  Biografia: { type: String }
});

export default mongoose.model('Author', authorSchema);
