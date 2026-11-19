import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import Tarjetas from './Screens/Tarjetas';
import Itemact from './Screens/ItemActividad';
import Encabezado from './Screens/Encabezado';


const datosflat = [
  {id:'1', nombre: 'Estudiar react native', desc: 'Repasa los componentes de la libreria'},
  {id:'2', nombre: 'Realiza la practica de java script', desc: 'completa los ejercicios del laboratorio'},
  {id:'3', nombre: 'Entrega de proyecto escolar', desc: 'encia tu proyecto final del cuatrimestr'},
  {id:'4', nombre: 'Prepara examen', desc: 'estudia los temas principales'},
];
export default function App() {
  return (
    <View style={styles.container}>
      
      <Encabezado></Encabezado>

      <Text>¡Hola estudiante!</Text>
      <Text>Hoy es un buen dia para cumplir tus objetivos</Text>
      <Text>Mis actividades</Text>
      {/* <Tarjetas style={styles.tarjetas} nombre="Estudiar React Native" descripcion="Repasa los componentes de la libreria"></Tarjetas>
      <Tarjetas style={styles.tarjetas} nombre="Realizar practica de javascript" descripcion="Completa los ejercicios del laboratorio"></Tarjetas>
      <Tarjetas style={styles.tarjetas} nombre="Entregar proyecto escolar" descripcion="Envia tu proyecto final del cuatrimestre"></Tarjetas>
      <Tarjetas style={styles.tarjetas} nombre="Preparar examen" descripcion="estudiar los temas principales"></Tarjetas> */}
      <FlatList
          data={datosflat}
          keyExtractor={(item) => item.id}
          renderItem={({item}) =>(
            <Itemact style={styles.tarjetas}nombre = {item.nombre} descripcion={item.desc}  ></Itemact>
          )}
        >
        </FlatList>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tarjetas:{
    borderWidth: 3,
    borderRadius: 10,
    padding: 15,
    margin: 20,
    backgroundColor: 'blue',
    alignItems: 'center',
  },
});
