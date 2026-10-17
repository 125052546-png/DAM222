/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Saludo } from './components/Saludo';
import { Saludo2 } from './components/Saludo2';
import { Perfil } from './components/Perfil';
import {useState} from 'react'

/* zona del main */
export default function App() {
    return (
    <View style={styles.container}>
      
      <Perfil nombre = "Andres"carrera= "ITIID" materia = "movil" cuatri = "4"/>

      <Perfil nombre = "juan"carrera= "ITIID" materia = "movil" cuatri = "4"/>
      <Perfil nombre = "pepe" carrera= "ITIID" materia = "movil" cuatri = "4" />
      

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
