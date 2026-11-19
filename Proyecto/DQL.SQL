#DQL

#1. Usuarios activos con su rol (usuarios, roles)
SELECT u.nombre, u.apellidos, r.nombre AS rol
FROM usuarios u
INNER JOIN roles r ON r.id_rol = u.id_rol
WHERE u.estado = 'activo'
ORDER BY u.apellidos;

#2. Servicios activos con su oferente y categoria (servicios, usuarios, categorias)
SELECT s.titulo, u.nombre AS oferente, c.nombre AS categoria, s.horas_estimadas
FROM servicios s
INNER JOIN usuarios u   ON u.id_usuario = s.id_usuario
INNER JOIN categorias c ON c.id_categoria = s.id_categoria
WHERE s.estado = 'activo';

#3. Solicitudes con el servicio pedido y quien lo solicita (solicitudes, servicios, usuarios)
SELECT sol.id_solicitud, sv.titulo AS servicio, u.nombre AS solicitante, sol.estado
FROM solicitudes sol
INNER JOIN servicios sv ON sv.id_servicio = sol.id_servicio
INNER JOIN usuarios u   ON u.id_usuario = sol.id_solicitante;

#4. Saldo de creditos (horas) de cada usuario (usuarios, movimientos_credito)
SELECT u.nombre, COALESCE(SUM(m.cantidad), 0) AS saldo
FROM usuarios u
LEFT JOIN movimientos_credito m ON m.id_usuario = u.id_usuario
GROUP BY u.id_usuario, u.nombre
ORDER BY saldo DESC;

#5. Calificaciones con evaluador, evaluado y puntuacion (calificaciones, usuarios x2)
SELECT ue.nombre AS evaluador, ud.nombre AS evaluado, ca.puntuacion, ca.comentario
FROM calificaciones ca
INNER JOIN usuarios ue ON ue.id_usuario = ca.id_evaluador
INNER JOIN usuarios ud ON ud.id_usuario = ca.id_evaluado;

#6. Habilidades de cada usuario con su nivel (usuario_habilidad, usuarios, habilidades)
SELECT u.nombre, h.nombre AS habilidad, uh.nivel, uh.anios_experiencia
FROM usuario_habilidad uh
INNER JOIN usuarios u     ON u.id_usuario = uh.id_usuario
INNER JOIN habilidades h  ON h.id_habilidad = uh.id_habilidad
ORDER BY u.nombre;

#7. Servicios mas guardados como favoritos (favoritos, servicios)
SELECT s.titulo, COUNT(*) AS veces_favorito
FROM favoritos f
INNER JOIN servicios s ON s.id_servicio = f.id_servicio
GROUP BY s.id_servicio, s.titulo
ORDER BY veces_favorito DESC;

#8. Historial de eventos por usuario, del mas reciente al mas antiguo (historial, usuarios)
SELECT u.nombre, h.tipo_evento, h.descripcion, h.fecha
FROM historial h
INNER JOIN usuarios u ON u.id_usuario = h.id_usuario
ORDER BY h.fecha DESC;

#9. Reportes con quien reporta, a quien se reporta y el estado del intercambio si aplica (reportes, usuarios x2, intercambios)
SELECT r.id_reporte, r.tipo, ur.nombre AS reportante, ud.nombre AS reportado, r.motivo, i.estado AS estado_intercambio, r.estado
FROM reportes r
INNER JOIN usuarios ur         ON ur.id_usuario = r.id_reportante
LEFT JOIN usuarios ud          ON ud.id_usuario = r.id_usuario_reportado
LEFT JOIN intercambios i       ON i.id_intercambio = r.id_intercambio
ORDER BY r.fecha DESC;

#10. Cantidad de reportes por tipo y estado (reportes)
SELECT tipo, estado, COUNT(*) AS total
FROM reportes
GROUP BY tipo, estado
ORDER BY tipo;
