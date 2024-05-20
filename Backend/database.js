const mysql = require('mysql2');

// Configuración de conexión a la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'lucin12345',
  database: 'libreria'
};

// Crear conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect(error => {
  if (error) {
    return console.error('Error al conectar a la base de datos: ' + error.message);
  }
  console.log('Conectado a la base de datos MySQL!');
});

module.exports = connection;
