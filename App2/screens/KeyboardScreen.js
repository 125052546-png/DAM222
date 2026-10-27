/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text} from 'react-native';

/* zona del main */
export default function KeyboardScreen() {
    return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <Text>Aqui va la practica de KeyboardAvoidingView</Text>

    </View>
  );
}


/* Zona de estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
