#DML

INSERT INTO roles (nombre, descripcion) VALUES
('Administrador', 'Gestiona usuarios y categorias'),
('Miembro',       'Ofrece y solicita servicios');

INSERT INTO usuarios (id_rol, nombre, apellidos, correo, contrasena, telefono, estado, fecha_registro) VALUES
(1, 'Leo',     'Suarez Cocilion', 'leonardo.suarez@email.com', 'Clave123', '4421876732', 'activo', '2026-08-02 10:00'),
(2, 'Antonio', 'Ramirez Regla',   'antonio.ramirez@gmail.com', 'Clave123', '4421543553', 'activo', '2026-08-03 11:30'),
(2, 'Aaron',   'Cuenca Garcia',   'aaron.cuenca@email.com',    'Clave123', NULL,         'activo', '2026-08-04 12:00'),
(2, 'Jorge',   'Hidalgo Barrera', 'jorge.barrera@email.com',   'Clave123', NULL,         'activo', '2026-08-05 08:15');

INSERT INTO categorias (nombre, descripcion) VALUES
('Tecnologia', 'Programacion y software'),
('Idiomas',    'Lenguajes extranjeros'),
('Diseno',     'Diseno web'),
('Educacion',  'Ensenanza y aprendizaje'),
('Musica',     'Instrumentos y produccion de audio');

INSERT INTO habilidades (id_categoria, nombre, descripcion) VALUES
(2, 'Ingles conversacional', 'Hablar y escuchar en ingles'),
(2, 'Frances basico',        'Frases de viaje'),
(1, 'Python',                'Programacion en Python'),
(5, 'Guitarra',              'Guitarra acustica'),
(3, 'Diseno web',            'Maquetacion de paginas web'),
(4, 'Matematicas',           'Tutorias de matematicas');

INSERT INTO usuario_habilidad (id_usuario, id_habilidad, nivel, anios_experiencia) VALUES
(2, 1, 'avanzado',   5),
(2, 2, 'basico',     1),
(3, 4, 'intermedio', 4),
(3, 3, 'intermedio', 2),
(4, 5, 'avanzado',   3),
(1, 6, 'intermedio', 3);

INSERT INTO servicios (id_usuario, id_categoria, titulo, descripcion, horas_estimadas, modalidad, estado, fecha_publicacion) VALUES
(2, 2, 'Clases de ingles',       'Practica de conversacion',      1, 'virtual',    'activo',  '2026-08-10 10:00'),
(3, 5, 'Guitarra principiantes', 'Primeros acordes',              1, 'presencial', 'activo',  '2026-08-11 11:00'),
(4, 3, 'Diseno web basico',      'Maquetacion de una pagina',     2, 'presencial', 'activo',  '2026-08-12 09:30'),
(3, 1, 'Introduccion a Python',  'Variables, ciclos y funciones', 2, 'virtual',    'activo',  '2026-08-13 17:00'),
(2, 2, 'Frances para viajeros',  'Frases utiles para viajar',     1, 'virtual',    'pausado', '2026-08-14 18:00');

INSERT INTO solicitudes (id_servicio, id_solicitante, mensaje, fecha_propuesta, horas_solicitadas, estado) VALUES
(1, 3, 'Quiero mejorar mi ingles',    '2026-09-05 17:00', 1, 'completada'),
(2, 4, 'Nunca he tocado la guitarra', '2026-09-08 18:00', 1, 'completada'),
(3, 2, 'Necesito una pagina web',     '2026-11-15 10:00', 2, 'aceptada'),
(4, 4, 'Quiero aprender Python',      '2026-11-20 16:00', 2, 'pendiente'),
(1, 1, 'Busco practicar ingles',      '2026-09-20 17:00', 1, 'rechazada');

INSERT INTO intercambios (id_solicitud, fecha_inicio, fecha_fin, horas_realizadas, estado) VALUES
(1, '2026-09-05 17:00', '2026-09-05 18:00', 1,    'completado'),
(2, '2026-09-08 18:00', '2026-09-08 19:00', 1,    'completado'),
(3, '2026-11-15 10:00', NULL,               NULL, 'programado');

INSERT INTO movimientos_credito (id_usuario, id_intercambio, tipo, cantidad, descripcion, fecha) VALUES
(1, NULL, 'bonificacion',  3, 'Bono de bienvenida',          '2026-08-02 10:05'),
(2, NULL, 'bonificacion',  3, 'Bono de bienvenida',          '2026-08-03 11:35'),
(3, NULL, 'bonificacion',  3, 'Bono de bienvenida',          '2026-08-04 12:05'),
(4, NULL, 'bonificacion',  3, 'Bono de bienvenida',          '2026-08-05 08:20'),
(3, 1,    'gastado',      -1, 'Clase de ingles recibida',    '2026-09-05 18:00'),
(2, 1,    'ganado',        1, 'Clase de ingles impartida',   '2026-09-05 18:00'),
(4, 2,    'gastado',      -1, 'Clase de guitarra recibida',  '2026-09-08 19:00'),
(3, 2,    'ganado',        1, 'Clase de guitarra impartida', '2026-09-08 19:00');

INSERT INTO calificaciones (id_intercambio, id_evaluador, id_evaluado, puntuacion, comentario, fecha) VALUES
(1, 3, 2, 5, 'Muy buena clase',              '2026-09-05 20:00'),
(1, 2, 3, 5, 'Excelente alumno',             '2026-09-05 20:30'),
(2, 4, 3, 4, 'Aprendi mis primeros acordes', '2026-09-08 21:00'),
(2, 3, 4, 5, 'Muy atento',                   '2026-09-08 21:30');

INSERT INTO favoritos (id_usuario, id_servicio, fecha) VALUES
(2, 4, '2026-08-20 10:00'),
(4, 1, '2026-08-21 11:00'),
(2, 2, '2026-08-22 12:00'),
(1, 3, '2026-08-23 13:00');

INSERT INTO historial (id_usuario, id_solicitud, id_intercambio, tipo_evento, descripcion, fecha) VALUES
(3, 1,    NULL, 'solicitud_creada',       'Aaron solicito clases de ingles', '2026-09-01 10:00'),
(2, 1,    NULL, 'solicitud_aceptada',     'Antonio acepto la solicitud',     '2026-09-02 09:00'),
(2, NULL, 1,    'intercambio_completado', 'Se completo la clase de ingles',  '2026-09-05 18:00'),
(3, NULL, 2,    'intercambio_completado', 'Se completo la clase de guitarra','2026-09-08 19:00');

INSERT INTO reportes (id_reportante, tipo, id_usuario_reportado, id_intercambio, id_habilidad, id_solicitud, motivo, descripcion, estado, fecha) VALUES
(3, 'usuario',      4,    NULL, NULL, NULL, 'Perfil incompleto',        'El perfil no tiene telefono ni datos de contacto', 'pendiente',   '2026-09-10 10:00'),
(4, 'participante', 3,    2,    NULL, NULL, 'Llego tarde a la clase',   'La clase de guitarra empezo 20 minutos tarde',     'resuelto',    '2026-09-09 09:00'),
(2, 'habilidades',  NULL, NULL, 5,    NULL, 'Habilidad sin comprobar',  'Diseno web avanzado sin evidencia de experiencia', 'en_revision', '2026-09-12 11:00'),
(1, 'solicitudes',  NULL, NULL, NULL, 5,    'Rechazo sin explicacion',  'La solicitud fue rechazada sin ningun mensaje',    'pendiente',   '2026-09-21 12:00'),
(3, 'general',      NULL, NULL, NULL, NULL, 'Sugerencia de la app',     'Agregar recordatorios antes de cada intercambio',  'descartado',  '2026-09-15 13:00');
