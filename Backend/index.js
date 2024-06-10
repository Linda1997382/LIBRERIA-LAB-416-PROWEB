import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import pool from './db.js';
import config from './config.js';
import cors from 'cors';
import booksRoutes from './routes/book.js'; // Importa las rutas de books.js
import cartRoutes from './routes/cart.js';  //importa las rutas de cart.js
import categoryRoutes from './routes/categoria.js';
import editorialRoutes from './routes/editorial.js';
import ventasRoutes from './routes/ventas.js'; 

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
    const [existingUsers] = await pool.query('SELECT * FROM usuario WHERE Email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO usuario (Nombre, Email, Password, privilegio_id) VALUES (?, ?, ?, 1)', [username, email, hashedPassword]);

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

    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

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

// Ver todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT ID, Nombre, Email, privilegio_id FROM usuario');
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
    const [result] = await pool.query('UPDATE usuario SET privilegio_id = ? WHERE ID = ?', [privilegio_id, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Privilegio del usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el privilegio del usuario' });
  }
});
//actualizar credenciales
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

app.post('/api/authors', async (req, res) => {
  const { nombre, nacionalidad, fechaNacimiento, biografia } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO autor (Nombre, Nacionalidad, FechaNacimiento, Biografia) VALUES (?, ?, ?, ?)',
      [nombre, nacionalidad, fechaNacimiento, biografia]
    );

    res.status(201).json({ 
      message: 'Autor agregado exitosamente', 
      autorId: result.insertId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el autor' });
  }
});

// Obtener todos los autores
app.get('/api/authors', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM autor');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los autores' });
  }
});

// Eliminar un autor
app.delete('/api/authors/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM autor WHERE ID = ?', [id]);

    if (result.affectedRows === 0) {
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
app.use('api/ventas',ventasRoutes);


app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
