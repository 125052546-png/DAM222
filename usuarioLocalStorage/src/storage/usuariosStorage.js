const STORAGE_KEY = "usuarios";

function getStorage() {
  if (typeof window === "undefined" || !window.localStorage) {
    throw new Error("LocalStorage solo está disponible en el navegador.");
  }

  return window.localStorage;
}

function readUsuarios() {
  const storedValue = getStorage().getItem(STORAGE_KEY);
  if (storedValue === null) {
    return [];
  }

  const usuarios = JSON.parse(storedValue);
  if (!Array.isArray(usuarios)) {
    throw new Error("Los datos guardados de usuarios no tienen un formato válido.");
  }

  return usuarios;
}

function writeUsuarios(usuarios) {
  getStorage().setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

export async function obtenerUsuarios() {
  return readUsuarios();
}

export async function obtenerUsuarioPorId(id) {
  return readUsuarios().find((usuario) => usuario.id === id) ?? null;
}

export async function crearUsuario(datos) {
  const usuarios = readUsuarios();
  const usuario = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    nombre: datos.nombre.trim(),
    correo: datos.correo.trim(),
    telefono: datos.telefono.trim(),
  };

  writeUsuarios([...usuarios, usuario]);
  return usuario;
}

export async function actualizarUsuario(id, datos) {
  const usuarios = readUsuarios();
  const index = usuarios.findIndex((usuario) => usuario.id === id);
  if (index === -1) {
    return null;
  }

  const usuarioActualizado = {
    ...usuarios[index],
    nombre: datos.nombre.trim(),
    correo: datos.correo.trim(),
    telefono: datos.telefono.trim(),
  };
  usuarios[index] = usuarioActualizado;
  writeUsuarios(usuarios);

  return usuarioActualizado;
}

export async function eliminarUsuario(id) {
  const usuarios = readUsuarios();
  const usuariosActualizados = usuarios.filter((usuario) => usuario.id !== id);
  if (usuariosActualizados.length === usuarios.length) {
    return false;
  }

  writeUsuarios(usuariosActualizados);
  return true;
}
