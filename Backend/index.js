import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import pool from './db.js';
import config from './config.js';
import cors from 'cors';

const app = express();
const port = config.server.port;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el correo ya existe
    const [rows] = await pool.query('SELECT ID FROM usuario WHERE Email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario
    const [result] = await pool.query(
      'INSERT INTO usuario (Nombre, Email, Password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el usuario existe en la base de datos
    const [rows] = await pool.query('SELECT * FROM usuario WHERE Email = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = rows[0];

    // Verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Enviar una respuesta exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
