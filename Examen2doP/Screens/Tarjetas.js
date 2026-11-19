import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet} from "react-native";
export default function Tarjetas({nombre, descripcion}){

  const [alerta, setAlerta] = useState(false);


  const presionar = () =>{
    alert(
        nombre
    )
  }
  return (
    <View style={styles.container}>
      <Text>{nombre}</Text>
      <Text>{descripcion}</Text>
      <Pressable style={styles.boton} onPress={presionar}>
        <Text>Ver Actividad</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    boton:{
        backgroundColor: '#53dfff',

    },
})