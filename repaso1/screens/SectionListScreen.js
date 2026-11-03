/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text, SectionList} from 'react-native';

/* zona del main */
const datos = [
  { titulo: 'Frutas', data: ['Manzana', 'Pera', 'Uva'] },
  { titulo: 'Verduras', data: ['Zanahoria', 'Lechuga', 'Papa'] },
  { titulo: 'Bebidas', data: ['Agua', 'Jugo', 'Refresco'] },
];

export default function SectionListScreen() {
    return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <Text style={styles.titulo}>SectionList</Text>
      <SectionList
        sections={datos}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => <Text style={styles.header}>{section.titulo}</Text>}
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
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    padding: 8,
  },
  item: {
    fontSize: 16,
    padding: 10,
  },

});
