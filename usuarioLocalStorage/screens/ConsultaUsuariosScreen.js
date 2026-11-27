import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import {
  eliminarUsuario,
  obtenerUsuarios,
} from "../src/storage/usuariosStorage";
import { styles } from "./UsuarioStyles";

export default function ConsultaUsuariosScreen() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarUsuarios = useCallback(async () => {
    setCargando(true);
    setError("");
    try {
      setUsuarios(await obtenerUsuarios());
    } catch (loadError) {
      setError(loadError.message || "No fue posible cargar los usuarios.");
    } finally {
      setCargando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarUsuarios();
    }, [cargarUsuarios]),
  );

  async function borrarUsuario(id) {
    if (!window.confirm("¿Deseas eliminar este usuario?")) {
      return;
    }

    try {
      await eliminarUsuario(id);
      await cargarUsuarios();
    } catch (deleteError) {
      setError(deleteError.message || "No fue posible eliminar el usuario.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Usuarios</Text>
        <Text style={styles.subtitle}>
          Consulta y administra los usuarios guardados en este navegador.
        </Text>

        {cargando ? <Text style={styles.status}>Cargando usuarios...</Text> : null}
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        {!cargando && !error && usuarios.length === 0 ? (
          <Text style={styles.status}>Todavía no hay usuarios registrados.</Text>
        ) : null}

        {usuarios.map((usuario) => (
          <View key={usuario.id} style={styles.card}>
            <Text style={styles.cardTitle}>{usuario.nombre}</Text>
            <Text style={styles.bodyText}>{usuario.correo}</Text>
            {usuario.telefono ? (
              <Text style={styles.bodyText}>{usuario.telefono}</Text>
            ) : null}
            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  router.push({ pathname: "/detalle", params: { id: usuario.id } })
                }
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>Ver detalle</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => borrarUsuario(usuario.id)}
                style={styles.dangerButton}
              >
                <Text style={styles.dangerButtonText}>Eliminar</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
