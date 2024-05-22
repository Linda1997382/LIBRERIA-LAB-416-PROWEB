import express from 'express';

const app = express();
const port = 3307; // Usa un puerto disponible

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
