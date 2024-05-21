// IMPORTANTE: Inicia el servidor para escuchar las solicitudes en el puerto configurado
app.listen(app.get('port'));

// Muestra un mensaje en la consola indicando en qué puerto está corriendo el servidor BORRAR DSPS
console.log('Estamos en el puerto', app.get('port'));

import app from './app'; // Importa la app Express configurada
import './BasedeDatos/conexion'; // Importa y establece la conexion con la base de datos


