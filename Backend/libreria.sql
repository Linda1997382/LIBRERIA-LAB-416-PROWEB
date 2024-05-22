-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2024 a las 05:30:43
-- Versión del servidor: 8.0.36
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;
SET NAMES utf8mb4;

--
-- Base de datos: libreria
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla autor
--

CREATE TABLE autor (
  ID int NOT NULL,
  Nombre varchar(100) NOT NULL,
  Nacionalidad varchar(100) DEFAULT NULL,
  FechaNacimiento date DEFAULT NULL,
  Biografia text,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla autorcategoria
--

CREATE TABLE autorcategoria (
  AutorID int NOT NULL,
  CategoriaID int NOT NULL,
  PRIMARY KEY (AutorID, CategoriaID),
  KEY CategoriaID (CategoriaID),
  CONSTRAINT autorcategoria_ibfk_1 FOREIGN KEY (AutorID) REFERENCES autor (ID),
  CONSTRAINT autorcategoria_ibfk_2 FOREIGN KEY (CategoriaID) REFERENCES categoria (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla bestseller
--

CREATE TABLE bestseller (
  LibroID int NOT NULL,
  FechaLogro date DEFAULT NULL,
  VentasAcumuladas bigint DEFAULT '0',
  PRIMARY KEY (LibroID),
  CONSTRAINT bestseller_ibfk_1 FOREIGN KEY (LibroID) REFERENCES libro (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla carrito
--

CREATE TABLE carrito (
  UsuarioID int NOT NULL,
  LibroID int NOT NULL,
  Cantidad int DEFAULT NULL,
  PRIMARY KEY (UsuarioID, LibroID),
  KEY LibroID (LibroID),
  CONSTRAINT carrito_ibfk_1 FOREIGN KEY (UsuarioID) REFERENCES usuario (ID),
  CONSTRAINT carrito_ibfk_2 FOREIGN KEY (LibroID) REFERENCES libro (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla categoria
--

CREATE TABLE categoria (
  ID int NOT NULL,
  Nombre varchar(50) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla categoria
--

INSERT INTO categoria (ID, Nombre) VALUES
(1, 'Ficción'),
(2, 'No ficción'),
(3, 'Ciencia ficción'),
(4, 'Fantasía'),
(5, 'Misterio'),
(6, 'Suspense'),
(7, 'Romance'),
(8, 'Aventura'),
(9, 'Histórica'),
(10, 'Policial'),
(11, 'Literatura clásica'),
(12, 'Literatura contemporánea'),
(13, 'Terror'),
(14, 'Poesía'),
(15, 'Ensayo'),
(16, 'Biografía'),
(17, 'Autobiografía'),
(18, 'Drama'),
(19, 'Humor'),
(20, 'Infantil'),
(21, 'Juvenil'),
(22, 'Filosofía'),
(23, 'Religión'),
(24, 'Ciencia'),
(25, 'Arte y fotografía'),
(26, 'Viajes'),
(27, 'Cocina y gastronomía'),
(28, 'Salud y bienestar'),
(29, 'Negocios y finanzas'),
(30, 'Educación');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla editorial
--

CREATE TABLE editorial (
  ID int NOT NULL,
  Nombre varchar(100) NOT NULL,
  Sede varchar(100) DEFAULT NULL,
  Fundacion date DEFAULT NULL,
  Descripcion text,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla libro
--

CREATE TABLE libro (
  ID int NOT NULL,
  Titulo varchar(255) NOT NULL,
  AutorID int DEFAULT NULL,
  EditorialID int DEFAULT NULL,
  Precio decimal(10,2) NOT NULL,
  Descripcion text,
  CategoriaID int DEFAULT NULL,
  Imagen varchar(255) DEFAULT NULL,
  PRIMARY KEY (ID),
  KEY AutorID (AutorID),
  KEY EditorialID (EditorialID),
  KEY CategoriaID (CategoriaID),
  CONSTRAINT libro_ibfk_1 FOREIGN KEY (AutorID) REFERENCES autor (ID),
  CONSTRAINT libro_ibfk_2 FOREIGN KEY (EditorialID) REFERENCES editorial (ID),
  CONSTRAINT libro_ibfk_3 FOREIGN KEY (CategoriaID) REFERENCES categoria (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla librocategoria
--

CREATE TABLE librocategoria (
  LibroID int NOT NULL,
  CategoriaID int NOT NULL,
  PRIMARY KEY (LibroID, CategoriaID),
  KEY CategoriaID (CategoriaID),
  CONSTRAINT librocategoria_ibfk_1 FOREIGN KEY (LibroID) REFERENCES libro (ID),
  CONSTRAINT librocategoria_ibfk_2 FOREIGN KEY (CategoriaID) REFERENCES categoria (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla usuario
--

CREATE TABLE usuario (
  ID int NOT NULL,
  Nombre varchar(100) NOT NULL,
  Email varchar(100) NOT NULL,
  Password varchar(255) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla ventadetalle
--

CREATE TABLE ventadetalle (
  VentaID int NOT NULL,
  LibroID int NOT NULL,
  Cantidad int NOT NULL,
  Precio decimal(10,2) NOT NULL,
  PRIMARY KEY (VentaID, LibroID),
  KEY LibroID (LibroID),
  CONSTRAINT ventadetalle_ibfk_1 FOREIGN KEY (VentaID) REFERENCES venta (ID),
  CONSTRAINT ventadetalle_ibfk_2 FOREIGN KEY (LibroID) REFERENCES libro (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla venta
--

CREATE TABLE venta (
  ID int NOT NULL,
  UsuarioID int NOT NULL,
  Fecha datetime NOT NULL,
  Total decimal(10,2) NOT NULL,
  PRIMARY KEY (ID),
  KEY UsuarioID (UsuarioID),
  CONSTRAINT venta_ibfk_1 FOREIGN KEY (UsuarioID) REFERENCES usuario (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Triggers
--

DELIMITER $$

CREATE TRIGGER actualizar_VentasAcumuladas 
AFTER INSERT ON ventadetalle 
FOR EACH ROW 
BEGIN
   UPDATE bestseller
   SET VentasAcumuladas = VentasAcumuladas + NEW.Cantidad
   WHERE LibroID = NEW.LibroID;
END$$

DELIMITER ;

COMMIT;

SET @OLD_CHARACTER_SET_CLIENT=NULL;
SET @OLD_CHARACTER_SET_RESULTS=NULL;
SET @OLD_COLLATION_CONNECTION=NULL;
--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `autorcategoria`
--
ALTER TABLE `autorcategoria`
  ADD PRIMARY KEY (`AutorID`,`CategoriaID`),
  ADD KEY `categoria_id` (`CategoriaID`);

--
-- Indices de la tabla `bestseller`
--
ALTER TABLE `bestseller`
  ADD PRIMARY KEY (`LibroID`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`UsuarioID`,`LibroID`),
  ADD KEY `libro_id` (`LibroID`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `editorial`
--
ALTER TABLE `editorial`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `autor_id` (`AutorID`),
  ADD KEY `editorial_id` (`EditorialID`),
  ADD KEY `categoria_id` (`CategoriaID`);

--
-- Indices de la tabla `librocategoria`
--
ALTER TABLE `librocategoria`
  ADD PRIMARY KEY (`LibroID`,`CategoriaID`),
  ADD KEY `categoria_id` (`CategoriaID`);

--
-- Indices de la tabla `libroeditorial`
--
ALTER TABLE `libroeditorial`
  ADD PRIMARY KEY (`LibroiD`,`EditorialID`),
  ADD KEY `editorial_id` (`EditorialID`);

--
-- Indices de la tabla `librorecomendado`
--
ALTER TABLE `librorecomendado`
  ADD PRIMARY KEY (`LibroID`);

--
-- Indices de la tabla `metodopago`
--
ALTER TABLE `metodopago`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `privilegio_id` (`PrivilegioID`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `libro_id` (`LibroID`),
  ADD KEY `metodo_pago_id` (`MetodoPagoID`);

--
-- Indices de la tabla `ventadetalle`
--
ALTER TABLE `ventadetalle`
  ADD PRIMARY KEY (`VentaID`,`LibroID`),
  ADD KEY `libro_id` (`LibroID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `autor`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `editorial`
--
ALTER TABLE `editorial`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `libro`
--
ALTER TABLE `libro`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodopago`
--
ALTER TABLE `metodopago`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `autorcategoria`
--
ALTER TABLE `autorcategoria`
  ADD CONSTRAINT `autorcategoria_ibfk_1` FOREIGN KEY (`AutorID`) REFERENCES `autor` (`ID`),
  ADD CONSTRAINT `autorcategoria_ibfk_2` FOREIGN KEY (`CategoriaID`) REFERENCES `categoria` (`ID`);

--
-- Filtros para la tabla `bestseller`
--
ALTER TABLE `bestseller`
  ADD CONSTRAINT `bestseller_ibfk_1` FOREIGN KEY (`LibroID`) REFERENCES `libro` (`ID`);

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`LibroID`) REFERENCES `libro` (`ID`);

--
-- Filtros para la tabla `libro`
--
ALTER TABLE `libro`
  ADD CONSTRAINT `libro_ibfk_1` FOREIGN KEY (`AutorID`) REFERENCES `autor` (`ID`),
  ADD CONSTRAINT `libro_ibfk_2` FOREIGN KEY (`EditorialID`) REFERENCES `editorial` (`ID`),
  ADD CONSTRAINT `libro_ibfk_3` FOREIGN KEY (`CategoriaID`) REFERENCES `categoria` (`ID`);

--
-- Filtros para la tabla `librocategoria`
--
ALTER TABLE `librocategoria`
  ADD CONSTRAINT `librocategoria_ibfk_1` FOREIGN KEY (`LibroID`) REFERENCES `libro` (`ID`),
  ADD CONSTRAINT `librocategoria_ibfk_2` FOREIGN KEY (`CategoriaID`) REFERENCES `categoria` (`ID`);

--
-- Filtros para la tabla `libroeditorial`
--
ALTER TABLE `libroeditorial`
  ADD CONSTRAINT `libroeditorial_ibfk_1` FOREIGN KEY (`LibroiD`) REFERENCES `libro` (`ID`),
  ADD CONSTRAINT `libroeditorial_ibfk_2` FOREIGN KEY (`EditorialID`) REFERENCES `editorial` (`ID`);

--
-- Filtros para la tabla `librorecomendado`
--
ALTER TABLE `librorecomendado`
  ADD CONSTRAINT `librorecomendado_ibfk_1` FOREIGN KEY (`LibroID`) REFERENCES `libro` (`ID`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`PrivilegioID`) REFERENCES `privilegio` (`ID`);

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`LibroID`) REFERENCES `libro` (`ID`),
  ADD CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`MetodoPagoID`) REFERENCES `metodopago` (`ID`);

--
-- Filtros para la tabla `ventadetalle`
--
ALTER TABLE `ventadetalle`
  ADD CONSTRAINT `ventadetalle_ibfk_1` FOREIGN KEY (`VentaID`) REFERENCES `venta` (`ID`),
  ADD CONSTRAINT `ventadetalle_ibfk_2` FOREIGN KEY (`LibroID`) REFERENCES `libro` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
