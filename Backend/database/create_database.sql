-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS libreria;
USE libreria;

-- Estructura de la tabla 'autor'
CREATE TABLE IF NOT EXISTS autor (
  ID INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(100) NOT NULL,
  Nacionalidad VARCHAR(100),
  FechaNacimiento DATE,
  Biografia TEXT,
  PRIMARY KEY (ID)
);

-- Estructura de la tabla 'autorcategoria'
CREATE TABLE IF NOT EXISTS autorcategoria (
  AutorID INT NOT NULL,
  CategoriaID INT NOT NULL,
  PRIMARY KEY (AutorID, CategoriaID),
  FOREIGN KEY (AutorID) REFERENCES autor(ID),
  FOREIGN KEY (CategoriaID) REFERENCES categoria(ID)
);

-- Estructura de la tabla 'bestseller'
CREATE TABLE IF NOT EXISTS bestseller (
  LibroID INT NOT NULL,
  FechaLogro DATE,
  VentasAcumuladas BIGINT DEFAULT 0,
  PRIMARY KEY (LibroID),
  FOREIGN KEY (LibroID) REFERENCES libro(ID)
);

-- Estructura de la tabla 'carrito'
CREATE TABLE IF NOT EXISTS carrito (
  UsuarioID INT NOT NULL,
  LibroID INT NOT NULL,
  Cantidad INT,
  PRIMARY KEY (UsuarioID, LibroID),
  FOREIGN KEY (UsuarioID) REFERENCES usuario(ID),
  FOREIGN KEY (LibroID) REFERENCES libro(ID)
);

-- Estructura de la tabla 'categoria'
CREATE TABLE IF NOT EXISTS categoria (
  ID INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (ID)
);

-- Estructura de la tabla 'editorial'
CREATE TABLE IF NOT EXISTS editorial (
  ID INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(100) NOT NULL,
  Sede VARCHAR(100),
  Fundacion DATE,
  Descripcion TEXT,
  PRIMARY KEY (ID)
);

-- Estructura de la tabla 'libro'
CREATE TABLE IF NOT EXISTS libro (
  ID INT NOT NULL AUTO_INCREMENT,
  Titulo VARCHAR(255) NOT NULL,
  AutorID INT,
  EditorialID INT,
  Precio DECIMAL(10,2) NOT NULL,
  Descripcion TEXT,
  CategoriaID INT,
  Imagen VARCHAR(255),
  PRIMARY KEY (ID),
  FOREIGN KEY (AutorID) REFERENCES autor(ID),
  FOREIGN KEY (EditorialID) REFERENCES editorial(ID),
  FOREIGN KEY (CategoriaID) REFERENCES categoria(ID)
);

-- Estructura de la tabla 'librocategoria'
CREATE TABLE IF NOT EXISTS librocategoria (
  LibroID INT NOT NULL,
  CategoriaID INT NOT NULL,
  PRIMARY KEY (LibroID, CategoriaID),
  FOREIGN KEY (LibroID) REFERENCES libro(ID),
  FOREIGN KEY (CategoriaID) REFERENCES categoria(ID)
);

-- Estructura de la tabla 'usuario'
CREATE TABLE IF NOT EXISTS usuario (
  ID INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(100) NOT NULL,
  Email VARCHAR(100) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  PRIMARY KEY (ID)
);

-- Estructura de la tabla 'ventadetalle'
CREATE TABLE IF NOT EXISTS ventadetalle (
  VentaID INT NOT NULL,
  LibroID INT NOT NULL,
  Cantidad INT NOT NULL,
  Precio DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (VentaID, LibroID),
  FOREIGN KEY (VentaID) REFERENCES venta(ID),
  FOREIGN KEY (LibroID) REFERENCES libro(ID)
);

-- Estructura de la tabla 'venta'
CREATE TABLE IF NOT EXISTS venta (
  ID INT NOT NULL AUTO_INCREMENT,
  UsuarioID INT NOT NULL,
  Fecha DATETIME NOT NULL,
  Total DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (UsuarioID) REFERENCES usuario(ID)
);

-- Insertar datos en la tabla 'categoria'
INSERT INTO categoria (Nombre) VALUES
('Ficción'),
('No ficción'),
('Ciencia ficción'),
('Fantasía'),
('Misterio'),
('Suspense'),
('Romance'),
('Aventura'),
('Histórica'),
('Policial'),
('Literatura clásica'),
('Literatura contemporánea'),
('Terror'),
('Poesía'),
('Ensayo'),
('Biografía'),
('Autobiografía'),
('Drama'),
('Humor'),
('Infantil'),
('Juvenil'),
('Filosofía'),
('Religión'),
('Ciencia'),
('Arte y fotografía'),
('Viajes'),
('Cocina y gastronomía'),
('Salud y bienestar'),
('Negocios y finanzas'),
('Educación');

-- Estructura de la tabla 'privilegio'
CREATE TABLE IF NOT EXISTS privilegio (
  ID INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(100) NOT NULL,
  PRIMARY KEY (ID)
);

-- Insertar datos en la tabla 'privilegio'
INSERT INTO privilegio (Nombre) VALUES
('Administrador'),
('Usuario regular');

-- Estructura de la tabla 'metodopago'
CREATE TABLE IF NOT EXISTS metodopago (
  ID INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(100) NOT NULL,
  PRIMARY KEY (ID)
);

-- Insertar datos en la tabla 'metodopago'
INSERT INTO metodopago (Nombre) VALUES
('Tarjeta de crédito'),
('Transferencia bancaria'),
('PayPal');

-- Estructura de la tabla 'librorecomendado'
CREATE TABLE IF NOT EXISTS librorecomendado (
  LibroID INT NOT NULL,
  PRIMARY KEY (LibroID),
  FOREIGN KEY (LibroID) REFERENCES libro(ID)
);

-- Estructura de la tabla 'libroeditorial'
CREATE TABLE IF NOT EXISTS libroeditorial (
LibroID INT NOT NULL,
EditorialID INT NOT NULL,
PRIMARY KEY (LibroID, EditorialID),
FOREIGN KEY (LibroID) REFERENCES libro(ID),
FOREIGN KEY (EditorialID) REFERENCES editorial(ID)
);

-- Crear el disparador para actualizar las ventas acumuladas en la tabla 'bestseller' después de insertar en 'ventadetalle'
DELIMITER CREATETRIGGERactualizarVentasAcumuladasAFTERINSERTONventadetalleFOREACHROWBEGINUPDATEbestsellerSETVentasAcumuladas=VentasAcumuladas+NEW.CantidadWHERELibroID=NEW.LibroID;ENDCREATETRIGGERactualizarV​entasAcumuladasAFTERINSERTONventadetalleFOREACHROWBEGINUPDATEbestsellerSETVentasAcumuladas=VentasAcumuladas+NEW.CantidadWHERELibroID=NEW.LibroID;END
DELIMITER ;

-- Crear los índices
-- Índices para la tabla autor
ALTER TABLE autor ADD INDEX idx_autor_nombre (Nombre);

-- Índices para la tabla categoria
ALTER TABLE categoria ADD INDEX idx_categoria_nombre (Nombre);

-- Índices para la tabla editorial
ALTER TABLE editorial ADD INDEX idx_editorial_nombre (Nombre);

-- Índices para la tabla libro
ALTER TABLE libro ADD INDEX idx_libro_titulo (Titulo);

-- Índices para la tabla usuario
ALTER TABLE usuario ADD INDEX idx_usuario_email (Email);

-- Índices para la tabla venta
ALTER TABLE venta ADD INDEX idx_venta_fecha (Fecha);

-- Índices para la tabla ventadetalle
ALTER TABLE ventadetalle ADD INDEX idx_ventadetalle_precio (Precio);

-- Índices para la tabla bestseller
ALTER TABLE bestseller ADD INDEX idx_bestseller_fechaLogro (FechaLogro);

-- Índices para la tabla carrito
ALTER TABLE carrito ADD INDEX idx_carrito_cantidad (Cantidad);

-- Índices para la tabla librocategoria
ALTER TABLE librocategoria ADD INDEX idx_librocategoria_libroID (LibroID);

-- Índices para la tabla metodopago
ALTER TABLE metodopago ADD INDEX idx_metodopago_nombre (Nombre);

-- Índices para la tabla privilegio
ALTER TABLE privilegio ADD INDEX idx_privilegio_nombre (Nombre);

COMMIT;
