CREATE DATABASE IF NOT EXISTS dam_tiid222;
USE dam_tiid222;

#DDL
CREATE TABLE roles (
    id_rol      INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(30) NOT NULL UNIQUE,
    descripcion VARCHAR(150)
);

CREATE TABLE usuarios (
    id_usuario     INT AUTO_INCREMENT PRIMARY KEY,
    id_rol         INT NOT NULL,
    nombre         VARCHAR(50) NOT NULL,
    apellidos      VARCHAR(80) NOT NULL,
    correo         VARCHAR(100) NOT NULL UNIQUE,
    contrasena     VARCHAR(100) NOT NULL,
    telefono       VARCHAR(15),
    estado         VARCHAR(20) NOT NULL DEFAULT 'activo',
    fecha_registro DATETIME NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre       VARCHAR(50) NOT NULL UNIQUE,
    descripcion  VARCHAR(150)
);

CREATE TABLE habilidades (
    id_habilidad INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    nombre       VARCHAR(60) NOT NULL,
    descripcion  VARCHAR(200),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE usuario_habilidad (
    id_usuario        INT NOT NULL,
    id_habilidad      INT NOT NULL,
    nivel             VARCHAR(20) NOT NULL,
    anios_experiencia INT,
    PRIMARY KEY (id_usuario, id_habilidad),
    FOREIGN KEY (id_usuario)   REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_habilidad) REFERENCES habilidades(id_habilidad)
);

CREATE TABLE servicios (
    id_servicio       INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario        INT NOT NULL,
    id_categoria      INT NOT NULL,
    titulo            VARCHAR(100) NOT NULL,
    descripcion       VARCHAR(500) NOT NULL,
    horas_estimadas   INT NOT NULL,
    modalidad         VARCHAR(20) NOT NULL,
    estado            VARCHAR(20) NOT NULL DEFAULT 'activo',
    fecha_publicacion DATETIME NOT NULL,
    FOREIGN KEY (id_usuario)   REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE solicitudes (
    id_solicitud      INT AUTO_INCREMENT PRIMARY KEY,
    id_servicio       INT NOT NULL,
    id_solicitante    INT NOT NULL,
    mensaje           VARCHAR(250),
    fecha_propuesta   DATETIME NOT NULL,
    horas_solicitadas INT NOT NULL,
    estado            VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    FOREIGN KEY (id_servicio)    REFERENCES servicios(id_servicio),
    FOREIGN KEY (id_solicitante) REFERENCES usuarios(id_usuario)
);

CREATE TABLE intercambios (
    id_intercambio   INT AUTO_INCREMENT PRIMARY KEY,
    id_solicitud     INT NOT NULL UNIQUE,
    fecha_inicio     DATETIME NOT NULL,
    fecha_fin        DATETIME,
    horas_realizadas INT,
    estado           VARCHAR(20) NOT NULL DEFAULT 'programado',
    FOREIGN KEY (id_solicitud) REFERENCES solicitudes(id_solicitud)
);

CREATE TABLE movimientos_credito (
    id_movimiento  INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario     INT NOT NULL,
    id_intercambio INT,
    tipo           VARCHAR(20) NOT NULL,
    cantidad       INT NOT NULL,
    descripcion    VARCHAR(150),
    fecha          DATETIME NOT NULL,
    FOREIGN KEY (id_usuario)     REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_intercambio) REFERENCES intercambios(id_intercambio)
);

CREATE TABLE calificaciones (
    id_calificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_intercambio  INT NOT NULL,
    id_evaluador    INT NOT NULL,
    id_evaluado     INT NOT NULL,
    puntuacion      INT NOT NULL,
    comentario      VARCHAR(250),
    fecha           DATETIME NOT NULL,
    UNIQUE (id_intercambio, id_evaluador),
    FOREIGN KEY (id_intercambio) REFERENCES intercambios(id_intercambio),
    FOREIGN KEY (id_evaluador)   REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_evaluado)    REFERENCES usuarios(id_usuario)
);

CREATE TABLE favoritos (
    id_usuario  INT NOT NULL,
    id_servicio INT NOT NULL,
    fecha       DATETIME NOT NULL,
    PRIMARY KEY (id_usuario, id_servicio),
    FOREIGN KEY (id_usuario)  REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio)
);

CREATE TABLE historial (
    id_historial   INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario     INT NOT NULL,
    id_solicitud   INT,
    id_intercambio INT,
    tipo_evento    VARCHAR(40) NOT NULL,
    descripcion    VARCHAR(200),
    fecha          DATETIME NOT NULL,
    FOREIGN KEY (id_usuario)     REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_solicitud)   REFERENCES solicitudes(id_solicitud),
    FOREIGN KEY (id_intercambio) REFERENCES intercambios(id_intercambio)
);

CREATE TABLE reportes (
    id_reporte           INT AUTO_INCREMENT PRIMARY KEY,
    id_reportante        INT NOT NULL,
    tipo                 VARCHAR(20) NOT NULL,
    id_usuario_reportado INT,
    id_intercambio       INT,
    id_habilidad         INT,
    id_solicitud         INT,
    motivo               VARCHAR(100) NOT NULL,
    descripcion          VARCHAR(250),
    estado               VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    fecha                DATETIME NOT NULL,
    FOREIGN KEY (id_reportante)        REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_usuario_reportado) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_intercambio)       REFERENCES intercambios(id_intercambio),
    FOREIGN KEY (id_habilidad)         REFERENCES habilidades(id_habilidad),
    FOREIGN KEY (id_solicitud)         REFERENCES solicitudes(id_solicitud)
);
