/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Saludo } from './components/Saludo';
import { Saludo2 } from './components/Saludo2';
/* zona del main */
export default function App() {
  return (
    <View style={styles.container}>
      <Text>hola mundo react native</Text>
      <Image source={require("./assets/wave.png")} ></Image>
      <Text>hola mundo react native</Text>
      <Saludo></Saludo>
      <Saludo/>

      <Saludo2></Saludo2>
      <Saludo2/>
      

      <StatusBar style="auto" />
      
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
