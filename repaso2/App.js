import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMostrarSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const agregarLibro = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    setGuardando(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      };

      setLibros([...libros, nuevoLibro]);
      setTitulo('');
      setAutor('');
      setGenero('');
      setGuardando(false);
      Alert.alert('Listo', 'Libro guardado correctamente.');
    }, 4000);
  };

  if (mostrarSplash) {
    return (
      <View style={styles.splash}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#1565C0" />
        <Text style={styles.splashTexto}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('./assets/fondo.jpg')} style={styles.fondo}>
      <StatusBar style="light" />
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Catálogo de Libros</Text>

        <TextInput
          style={styles.input}
          placeholder="Título del libro"
          value={titulo}
          onChangeText={setTitulo}
          editable={!guardando}
        />
        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={autor}
          onChangeText={setAutor}
          editable={!guardando}
        />
        <TextInput
          style={styles.input}
          placeholder="Género"
          value={genero}
          onChangeText={setGenero}
          editable={!guardando}
        />

        <Pressable
          style={({ pressed }) => [
            styles.boton,
            (pressed || guardando) && styles.botonInactivo,
          ]}
          onPress={agregarLibro}
          disabled={guardando}
        >
          <Text style={styles.botonTexto}>
            {guardando ? 'Guardando...' : 'Agregar Libro'}
          </Text>
        </Pressable>

        {guardando && (
          <View style={styles.cargando}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.textoBlanco}>Guardando libro...</Text>
          </View>
        )}

        <Text style={styles.total}>Total de libros: {libros.length}</Text>

        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <Text style={styles.libroTitulo}>{item.titulo}</Text>
              <Text style={styles.libroTexto}>Autor: {item.autor}</Text>
              <Text style={styles.libroTexto}>Género: {item.genero}</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  splashTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  fondo: {
    flex: 1,
  },
  contenedor: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 12,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  botonInactivo: {
    opacity: 0.6,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cargando: {
    alignItems: 'center',
    marginTop: 12,
  },
  textoBlanco: {
    color: '#FFFFFF',
    marginTop: 6,
    fontWeight: 'bold',
  },
  total: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginVertical: 12,
  },
  tarjeta: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  libroTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  libroTexto: {
    fontSize: 13,
  },
});
