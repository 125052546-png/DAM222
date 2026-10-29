/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet,View, Text, Pressable,Switch, Image} from 'react-native';
import SwitchScreen from '../components/SwitchScreen'
/* zona del main */
export default function PressableScreen() {

  const [imagenGrande, setImagenGrande] = useState (false)
  const [oscuro,setOscuro] = useState(false)
    return (
    <View style = {[styles.containercontainer, {backgroundColor: oscuro ? '#000000': '#FFFFFF'}]}>
      <Pressable>

        <Text>Presioname</Text>
      </Pressable>

      <Pressable
      onPress={() => setImagenGrande(!imagenGrande)}
      >
        <Image
        source ={require("../assets/wave.png")}
        style={[
          imagenGrande ? styles.imagenGrande : styles.image
        ]}
        />
      </Pressable>
      <SwitchScreen>
        oscuro = {oscuro}
        cambiarModo={setOscuro}

      </SwitchScreen>
      <StatusBar style = "auto"/>
    </View>
  );
}


/* Zona de estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 20,
    marginBottom: 20
  },
  image: {
    width: 100,
    height: 100,
  },
  imagenGrande:{
    width:180,
    height:180,

  }
});
