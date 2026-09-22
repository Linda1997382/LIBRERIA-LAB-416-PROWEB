import mongoose from 'mongoose';
import config from './config.js';

// Usar MONGO_URI desde las variables de entorno (ej. de MongoDB Atlas) si existe.
// Si no, usar la configuración local.
const mongoURI = process.env.MONGO_URI || `mongodb://${config.db.user || 'admin'}:${config.db.password || 'admin'}@${config.db.host || 'localhost'}:27017/${config.db.database || 'ecommerce'}?authSource=admin`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Conectado a MongoDB exitosamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
