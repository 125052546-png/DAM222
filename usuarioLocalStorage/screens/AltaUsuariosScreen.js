import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { crearUsuario } from "../src/storage/usuariosStorage";
import UsuarioFormulario from "./UsuarioFormulario";
import { styles } from "./UsuarioStyles";

export default function AltaUsuariosScreen() {
  const router = useRouter();

  async function guardarUsuario(datos) {
    await crearUsuario(datos);
    router.replace("/(Tabs)/consulta");
  }

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Registrar usuario</Text>
        <Text style={styles.subtitle}>
          Los datos se guardan en el almacenamiento local de este navegador.
        </Text>
        <UsuarioFormulario
          etiquetaBoton="Guardar usuario"
          onGuardar={guardarUsuario}
        />
      </View>
    </View>
  );
}
