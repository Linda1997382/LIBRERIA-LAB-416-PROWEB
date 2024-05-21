import app from './app.js'; // Importa la app Express configurada
import './database/database.js'; // Importa y establece la conexion con la base de datos

// IMPORTANTE: Inicia el servidor para escuchar las solicitudes en el puerto configurado
app.listen(app.get('port'), () => {
  // Muestra un mensaje en la consola indicando en qué puerto está corriendo el servidor
  console.log('Estamos en el puerto', app.get('port'));
});
