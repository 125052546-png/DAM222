/* 1. Zona de importaciones */
import { StyleSheet, Text, View, FlatList, SectionList } from 'react-native';

/* Datos para FlatList */
const datosFlat = [
  { id: '1', nombre: 'Juan' },
  { id: '2', nombre: 'María' },
  { id: '3', nombre: 'Pedro' },
  { id: '4', nombre: 'Emilio'}
];

/* Datos para SectionList */
const datosSection = [
  {
    titulo: 'Frutas',
    data: ['Manzana', 'Plátano'],
  },
  {
    titulo: 'Verduras',
    data: ['Zanahoria', 'Lechuga'],
  },
];

/* 2. Zona main */
export default function ListasScreen() {
    return (
      /* Contenedor principal que agrupa y organiza los elementos visuales */
      <View style={styles.container}>
        
        {/* Componente de texto para el título de la FlatList */}
        <Text style={styles.titulo}>Ejemplo FlatList</Text>
        
        {/* Componente FlatList para renderizar una lista plana de forma eficiente */}
        <FlatList
          data={datosFlat}                                    /* Arreglo de datos que se va a recorrer */
          keyExtractor={(item) => item.id}                   /* Función que extrae una clave única para cada elemento */
          renderItem={({ item }) => (                        /* Define cómo se renderiza cada elemento individual */
            <Text style={styles.item}>{item.nombre}</Text>  /* Componente visual para mostrar el nombre del elemento */
          )}
        />
  
        {/* Componente de texto para el título de la SectionList */}
        <Text style={styles.titulo}>Ejemplo SectionList</Text>
        
        {/* Componente SectionList para renderizar listas agrupadas por secciones */}
        <SectionList
          sections={datosSection}                            /* Arreglo de datos agrupados por secciones con títulos */
          keyExtractor={(item, index) => item + index}       /* Función que genera una clave única combinando item e índice */
          renderItem={({ item }) => (                        /* Define cómo se renderiza cada elemento dentro de la sección */
            <Text style={styles.item}>{item}</Text>         /* Componente visual para mostrar el elemento de la sección */
          )}
          renderSectionHeader={({ section }) => (            /* Define cómo se renderiza el encabezado de cada sección */
            <Text style={styles.encabezado}>{section.titulo}</Text> /* Muestra el título de la sección actual */
          )}
        />
  
      </View>
    );
  }

/* 3. Zona Estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  encabezado: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    padding: 5,
  },
  item: {
    fontSize: 14,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});