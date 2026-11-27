import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { obtenerUsuarioPorId } from "../src/storage/usuariosStorage";
import { styles } from "./UsuarioStyles";

export default function DetalleUsuarioScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;
    obtenerUsuarioPorId(String(id))
      .then((resultado) => {
        if (activo) setUsuario(resultado);
      })
      .catch((loadError) => {
        if (activo) setError(loadError.message || "No fue posible cargar el usuario.");
      });

    return () => {
      activo = false;
    };
  }, [id]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Detalle del usuario</Text>
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        {!error && !usuario ? (
          <Text style={styles.status}>No se encontró el usuario solicitado.</Text>
        ) : null}
        {usuario ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{usuario.nombre}</Text>
            <Text style={styles.bodyText}>Correo: {usuario.correo}</Text>
            <Text style={styles.bodyText}>
              Teléfono: {usuario.telefono || "No especificado"}
            </Text>
            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  router.push({ pathname: "/actualiza", params: { id: usuario.id } })
                }
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>Actualizar</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.back()}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>Volver</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}
