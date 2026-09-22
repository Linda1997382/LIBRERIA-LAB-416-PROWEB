import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;

console.log("Intentando conectar a:", uri.replace(/:([^:@]+)@/, ':***@')); // Ocultar contraseña en el log

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("✅ Conexión EXITOSA a MongoDB Atlas!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error de conexión:", err.message);
    process.exit(1);
  });
