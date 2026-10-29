/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet,View, Text, Pressable,Switch, Image} from 'react-native';

/* zona del main */
export default function SwitchScreen(oscuro, cambiarModo) {

  const [imagenGrande, setImagenGrande] = useState (false)
    return (
    <View>
      <StatusBar style = "auto"/>

      <Text style = {[styles.titulo, {color:oscuro ? '#FFFFFF' : '#000000'}]}>modo oscuro</Text>
      <Switch
      value = {oscuro}
      onValueChange={cambiarModo}
      />
    </View>
  );
}


/* Zona de estilos */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight:'bold',
    marginBottom: 8
  },
});
