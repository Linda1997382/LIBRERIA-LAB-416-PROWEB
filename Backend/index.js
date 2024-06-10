import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import pool from './db.js';
import config from './config.js';
import cors from 'cors';
import booksRoutes from './routes/book.js'; // Importa las rutas de books.js
import cartRoutes from './routes/cart.js';  //importa las rutas de cart.js

const app = express();
const port = config.server.port;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el correo electrónico ya está en uso
    const [existingUsers] = await pool.query('SELECT * FROM usuario WHERE Email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    await pool.query('INSERT INTO usuario (Nombre, Email, Password, privilegio_id) VALUES (?, ?, ?, 1)', [username, email, hashedPassword]);

    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar. Inténtalo de nuevo más tarde.' });
  }
});



// API para LOGIN
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el usuario existe en la base de datos
    const [rows] = await pool.query(
      `SELECT u.ID, u.Email, u.Password, p.Nombre as Privilegio
       FROM usuario u
       JOIN privilegio p ON u.privilegio_id = p.ID
       WHERE u.Email = ?`, 
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = rows[0];

    // Verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Enviar una respuesta exitosa con la información del usuario y su privilegio
    res.status(200).json({ 
      message: 'Inicio de sesión exitoso', 
      user: { 
        id: user.ID, 
        username: user.Email, 
        privilegio: user.Privilegio 
      } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

app.post('/api/updateUser', async (req, res) => {
  const { userId, name, email, password } = req.body;

  try {
    let updateQuery = 'UPDATE usuario SET';
    let updateParams = [];

    if (name) {
      updateQuery += ' Nombre = ?,';
      updateParams.push(name);
    }
    if (email) {
      updateQuery += ' Email = ?,';
      updateParams.push(email);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery += ' Password = ?,';
      updateParams.push(hashedPassword);
    }

    // Remove trailing comma
    updateQuery = updateQuery.slice(0, -1);

    updateQuery += ' WHERE ID = ?';
    updateParams.push(userId);

    await pool.query(updateQuery, updateParams);

    const [rows] = await pool.query('SELECT ID, Email, Nombre FROM usuario WHERE ID = ?', [userId]);
    const updatedUser = rows[0];

    res.status(200).json({ message: 'Datos actualizados correctamente', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
});



// Rutas para el API de libros
app.use('/api/books', booksRoutes);

//ruta cart
app.use('/api/cart', cartRoutes);

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
