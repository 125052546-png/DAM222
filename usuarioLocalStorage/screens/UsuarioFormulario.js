import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./UsuarioStyles";

export default function UsuarioFormulario({
  usuario,
  etiquetaBoton,
  onGuardar,
}) {
  const [nombre, setNombre] = useState(usuario?.nombre ?? "");
  const [correo, setCorreo] = useState(usuario?.correo ?? "");
  const [telefono, setTelefono] = useState(usuario?.telefono ?? "");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function guardar() {
    if (!nombre.trim() || !correo.trim()) {
      setError("El nombre y el correo son obligatorios.");
      return;
    }

    setCargando(true);
    setError("");
    try {
      await onGuardar({ nombre, correo, telefono });
    } catch (saveError) {
      setError(saveError.message || "No fue posible guardar el usuario.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Nombre *</Text>
      <TextInput
        accessibilityLabel="Nombre"
        autoCapitalize="words"
        onChangeText={setNombre}
        placeholder="Nombre completo"
        style={styles.input}
        value={nombre}
      />

      <Text style={styles.label}>Correo *</Text>
      <TextInput
        accessibilityLabel="Correo"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setCorreo}
        placeholder="nombre@ejemplo.com"
        style={styles.input}
        value={correo}
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        accessibilityLabel="Teléfono"
        keyboardType="phone-pad"
        onChangeText={setTelefono}
        placeholder="Teléfono"
        style={styles.input}
        value={telefono}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        accessibilityRole="button"
        disabled={cargando}
        onPress={guardar}
        style={[styles.primaryButton, cargando && styles.disabledButton]}
      >
        <Text style={styles.primaryButtonText}>
          {cargando ? "Guardando..." : etiquetaBoton}
        </Text>
      </Pressable>
    </View>
  );
}
