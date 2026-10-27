/* zona de importaciones */

import { StatusBar,  } from 'expo-status-bar';
import { StyleSheet,View, Text, ScrollView, SafeAreaView} from 'react-native';
/* import {SafeAreaView} from 'react-native-safe-area-context';
 *//* zona del main */
export default function SafeScreen() {
    return (
    <SafeAreaView style = {styles.safeArea}>
      <ScrollView contentContainerStyle = {styles.scrollContent}>
        <Text style = {styles.title}>practica en equipo</Text>
        <Text style = {styles.subtitle}>practica en equipo</Text>
      {[...Array(15)].map((_, index) => (
        <View key ={index} style = {styles.box}>
          <Text>Registro de prueba{index +1}</Text>


        </View>
      ))}
      <StatusBar style = "auto"/>
      
      </ScrollView>
    </SafeAreaView>
  );
}


/* Zona de estilos */
const styles = StyleSheet.create({
  safeArea: {
    flex:1,
    backgroundColor: '#00bfff'

  },
  scrollContent: { 
    padding: 20,
    alignItems: 'center'
  },

  title: {
    fontSize:24,
    fontWeight:'bold',
    marginTop:10
  },
  subtitle: {
    fontSize:16,
    color: 'gray',
    marginBottom:20
  },
  box: {
    backgroundColor:'white',
    width:'90%',
    padding:30,
    marginVertical:10,
    borderRadius:8,
    elevation:3
  },
});
