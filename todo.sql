-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2022 a las 04:34:32
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `todo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listas`
--

CREATE TABLE `listas` (
  `id` int(11) NOT NULL,
  `idDueño` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` varchar(15) NOT NULL DEFAULT 'pendiente',
  `fechaResolucion` date DEFAULT NULL,
  `archivada` tinyint(1) DEFAULT NULL,
  `tAsignadas` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `listas`
--

INSERT INTO `listas` (`id`, `idDueño`, `titulo`, `fechaCreacion`, `estado`, `fechaResolucion`, `archivada`, `tAsignadas`) VALUES
(70, 29, 'Tareas Asignadas', '2022-11-11 02:21:03', 'en proceso', NULL, 0, 1),
(71, 30, 'Tareas Asignadas', '2022-11-11 01:57:02', 'pendiente', NULL, 0, 1),
(72, 31, 'Tareas Asignadas', '2022-11-11 01:58:18', 'pendiente', NULL, 0, 1),
(73, 32, 'Tareas Asignadas', '2022-11-11 02:33:25', 'en proceso', NULL, 0, 1),
(74, 33, 'Tareas Asignadas', '2022-11-11 01:59:35', 'pendiente', NULL, 0, 1),
(75, 29, 'Tareas trabajo', '2022-11-11 02:23:50', 'en proceso', NULL, 0, 0),
(76, 29, 'Lista vacia para borrar', '2022-11-11 02:24:04', 'pendiente', NULL, 0, 0),
(77, 29, 'lista completa para archivar', '2022-11-11 02:24:56', 'resuelta', '2022-11-11', 0, 0),
(78, 29, 'cosas hechas', '2022-11-11 02:26:33', 'resuelta', '2022-11-11', 1, 0),
(79, 30, 'tareas auto', '2022-11-11 02:29:31', 'en proceso', NULL, 0, 0),
(80, 32, 'jardineria', '2022-11-11 02:33:38', 'en proceso', NULL, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `idLista` int(11) NOT NULL,
  `tarea` varchar(100) NOT NULL,
  `fechaCreacionTarea` date NOT NULL,
  `prioridad` varchar(10) NOT NULL,
  `estadoTarea` varchar(20) NOT NULL,
  `fechaResolucionTarea` date DEFAULT NULL,
  `fechaLimiteTarea` date DEFAULT NULL,
  `idCreador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `idLista`, `tarea`, `fechaCreacionTarea`, `prioridad`, `estadoTarea`, `fechaResolucionTarea`, `fechaLimiteTarea`, `idCreador`) VALUES
(91, 70, 'preparar cena', '2022-11-11', 'alta', 'sin resolver', NULL, '2022-11-18', 33),
(92, 70, 'limpiar la casa', '2022-11-11', 'alta', 'resolviendo', NULL, '2022-11-30', 33),
(93, 71, 'lavar el auto', '2022-11-11', 'media', 'sin resolver', NULL, '2022-12-10', 33),
(94, 72, 'planchar la ropa', '2022-11-11', 'alta', 'sin resolver', NULL, '2022-11-30', 33),
(95, 73, 'Arreglar el techo', '2022-11-11', 'media', 'resuelta', '2022-11-11', '0000-00-00', 33),
(96, 70, 'Dormir', '2022-11-11', 'alta', 'sin resolver', NULL, '2022-11-30', 29),
(97, 71, 'hacer la cama', '2022-11-11', 'media', 'sin resolver', NULL, '2022-11-30', 29),
(98, 72, 'cebar mate', '2022-11-11', 'alta', 'sin resolver', NULL, '2022-12-10', 29),
(100, 75, 'actualiar precios', '2022-11-11', 'media', 'resuelta', '2022-11-11', '2022-11-24', 29),
(101, 75, 'armar vidirera', '2022-11-11', 'alta', 'resolviendo', NULL, '2022-11-25', 29),
(102, 77, 'algo1', '2022-11-11', 'baja', 'resuelta', '2022-11-11', '2022-11-29', 29),
(103, 77, 'algo2', '2022-11-11', 'media', 'resuelta', '2022-11-11', '2022-11-25', 29),
(104, 78, 'cosa1', '2022-11-11', 'baja', 'resuelta', '2022-11-11', '2022-11-16', 29),
(105, 78, 'cosa2', '2022-11-11', 'baja', 'resuelta', '2022-11-11', '2022-12-02', 29),
(106, 78, 'cosa3', '2022-11-11', 'baja', 'resuelta', '2022-11-11', '0000-00-00', 29),
(107, 79, 'llevar a mecanico', '2022-11-11', 'baja', 'sin resolver', NULL, '2022-11-17', 30),
(108, 79, 'comprar cubiertas', '2022-11-11', 'baja', 'sin resolver', NULL, '2022-11-23', 30),
(109, 79, 'cargar nafta', '2022-11-11', 'baja', 'resuelta', '2022-11-11', '2022-11-24', 30),
(110, 70, 'pagar la luz', '2022-11-11', 'alta', 'sin resolver', NULL, '2022-11-17', 30),
(112, 72, 'se me acabaron las ideas', '2022-11-11', 'baja', 'sin resolver', NULL, '2022-11-22', 30),
(113, 80, 'cortar pasto', '2022-11-11', 'baja', 'sin resolver', NULL, '2022-11-23', 32),
(114, 80, 'regar', '2022-11-11', 'media', 'resuelta', '2022-11-11', '2022-11-22', 32),
(115, 73, 'ayudar amigos', '2022-11-11', 'alta', 'sin resolver', NULL, '2022-11-17', 32),
(116, 70, 'arreglar inodoro', '2022-11-11', 'baja', 'sin resolver', NULL, '2022-11-22', 32),
(117, 75, 'despedir a godinez', '2022-11-11', 'alta', 'resolviendo', NULL, '2022-11-24', 29),
(118, 75, 'pagar dueldos', '2022-11-11', 'media', 'sin resolver', NULL, '2022-11-30', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `contrasenia` varchar(200) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `mail`, `contrasenia`, `nombre`) VALUES
(29, 'pepo@gmail.com', '$2b$10$A6QLfAVkBdPZbMUqFc5qJuylp8qk38lSKMXHHQG9bfjunhuKcQeSW', 'pepo'),
(30, 'marta@hotmail.com', '$2b$10$i11s/OMkgQvW3B4aUzFaCOxbxoWS8AT1XLP0R4phuqzLxeEVhvEbO', 'marta27'),
(31, 'rodolfo@gmail.com', '$2b$10$72hWAKSpdSANY4xxy.JLceyYV.iw0WM39VUMkF1X51ewRYdOFm7hO', 'rodolf'),
(32, 'paco123@gmail.com', '$2b$10$TcaHxerrKSnpK/I9lsv1MuKKP6pDHV7mMThwbPC9qQ6cT02dK.6dy', 'paquito'),
(33, 'msebaf@hotmail.com', NULL, 'msebaf');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `listas`
--
ALTER TABLE `listas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `idDueño` (`idDueño`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `idLista` (`idLista`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `listas`
--
ALTER TABLE `listas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `listas`
--
ALTER TABLE `listas`
  ADD CONSTRAINT `listas_ibfk_1` FOREIGN KEY (`idDueño`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`idLista`) REFERENCES `listas` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
