import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import connectDB from './db.js';
import config from './config.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import booksRoutes from './routes/book.js';
import cartRoutes from './routes/cart.js';
import categoryRoutes from './routes/categoria.js';
import editorialRoutes from './routes/editorial.js';
import ventasRoutes from './routes/ventas.js'; 

import User from './models/User.js';
import Author from './models/Author.js';

const app = express();
const port = config.server.port || 3000;

// Conectar a la base de datos MongoDB
connectDB();

app.use(bodyParser.json());
app.use(cors());

// Configurar directorio estático para servir el frontend desde la carpeta "public"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ Email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      Nombre: username,
      Email: email,
      Password: hashedPassword,
      privilegio_id: 1
    });

    await newUser.save();

    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar. Inténtalo de nuevo más tarde.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const user = await User.findOne({ Email: username });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    let privilegio = user.privilegio_id === 1 ? 'Usuario' : 'Administrador';

    res.status(200).json({ 
      message: 'Inicio de sesión exitoso', 
      user: { 
        id: user._id, 
        username: user.Email, 
        privilegio: privilegio
      } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

// Ver todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, '_id Nombre Email privilegio_id');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

// Cambiar privilegio de un usuario
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { privilegio_id } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { privilegio_id }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Privilegio del usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el privilegio del usuario' });
  }
});

// Actualizar credenciales
app.post('/api/updateUser', async (req, res) => {
  const { userId, name, email, password } = req.body;

  try {
    let updateFields = {};
    if (name) updateFields.Nombre = name;
    if (email) updateFields.Email = email;
    if (password) {
      updateFields.Password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    
    if(!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ 
      message: 'Datos actualizados correctamente', 
      user: {
        ID: updatedUser._id,
        Email: updatedUser.Email,
        Nombre: updatedUser.Nombre
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});

app.post('/api/authors', async (req, res) => {
  const { nombre, nacionalidad, fechaNacimiento, biografia } = req.body;

  try {
    const newAuthor = new Author({
      Nombre: nombre,
      Nacionalidad: nacionalidad,
      FechaNacimiento: fechaNacimiento,
      Biografia: biografia
    });

    const savedAuthor = await newAuthor.save();

    res.status(201).json({ 
      message: 'Autor agregado exitosamente', 
      autorId: savedAuthor._id 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el autor' });
  }
});

// Obtener todos los autores
app.get('/api/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los autores' });
  }
});

// Eliminar un autor
app.delete('/api/authors/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }

    res.status(200).json({ message: 'Autor eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el autor' });
  }
});

app.use('/api/books', booksRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/editorials', editorialRoutes);
app.use('/api/ventas', ventasRoutes);

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
