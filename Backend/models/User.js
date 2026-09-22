import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  privilegio_id: { type: Number, default: 1 } // 1: user, 2: admin (for simplicity mapping from the old SQL)
});

export default mongoose.model('User', userSchema);
