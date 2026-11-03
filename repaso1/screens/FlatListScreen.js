/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text, FlatList} from 'react-native';

/* zona del main */
const datos = [
  { id: '1', nombre: 'Manzana' },
  { id: '2', nombre: 'Pera' },
  { id: '3', nombre: 'Uva' },
  { id: '4', nombre: 'Platano' },
  { id: '5', nombre: 'Sandia' },
];

export default function FlatListScreen() {
    return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <Text style={styles.titulo}>FlatList</Text>
      <FlatList
        data={datos}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Text style={styles.item}>{item.nombre}</Text>}
      />
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
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  item: {
    fontSize: 16,
    padding: 10,
  },

});
