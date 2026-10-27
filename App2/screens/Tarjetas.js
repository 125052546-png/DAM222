/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Perfil } from '../components/Perfil';
import {useState} from 'react'

/* zona del main */
export default function Tarjetas() {
    return (
    <View style={styles.container}>
      
      <Perfil style={styles.tarjeta1} nombre = "Andres"carrera= "ITIID" materia = "movil" cuatri = "4"/>

      <Perfil style={styles.tarjeta2} nombre = "juan"carrera= "ITIID" materia = "movil" cuatri = "4" />
      <Perfil style={styles.tarjeta3} nombre = "pepe" carrera= "ITIID" materia = "movil" cuatri = "4" />
      

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
    justifyContent: 'space-around',
    flexDirection:'row'
  },
  tarjeta1:{
        borderWidth:3,
        borderRadius:10,
        padding:15,
        margin:20,
        backgroundColor:'blue',
        alignItems:'center',
        

    },
    tarjeta2:{
        borderWidth:3,
        borderRadius:10,
        padding:15,
        margin:20,
        backgroundColor:'red',
        alignItems:'center',

    },
    tarjeta3:{
        borderWidth:3,
        borderRadius:10,
        padding:15,
        margin:20,
        backgroundColor:'pink',
        alignItems:'center',

    },
});
