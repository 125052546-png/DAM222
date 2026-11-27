import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  actualizarUsuario,
  obtenerUsuarioPorId,
} from "../src/storage/usuariosStorage";
import UsuarioFormulario from "./UsuarioFormulario";
import { styles } from "./UsuarioStyles";

export default function ActualizarUsuarioScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;
    obtenerUsuarioPorId(String(id))
      .then((resultado) => {
        if (activo) setUsuario(resultado);
      })
      .catch((loadError) => {
        if (activo) setError(loadError.message || "No fue posible cargar el usuario.");
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, [id]);

  async function guardarCambios(datos) {
    const actualizado = await actualizarUsuario(String(id), datos);
    if (!actualizado) {
      throw new Error("El usuario ya no existe.");
    }
    router.replace({ pathname: "/detalle", params: { id: String(id) } });
  }

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Actualizar usuario</Text>
        {cargando ? <Text style={styles.status}>Cargando usuario...</Text> : null}
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        {!cargando && !error && !usuario ? (
          <Text style={styles.status}>No se encontró el usuario solicitado.</Text>
        ) : null}
        {usuario ? (
          <UsuarioFormulario
            etiquetaBoton="Guardar cambios"
            onGuardar={guardarCambios}
            usuario={usuario}
          />
        ) : null}
      </View>
    </View>
  );
}
