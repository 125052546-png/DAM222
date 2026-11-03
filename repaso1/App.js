/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Switch, Pressable } from 'react-native';
import { useState } from 'react';

/* zona del main */
export default function App() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');
  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deportes, setDeportes] = useState(false);

  const enviar = () => {
    if (nombre.trim() === '' || carrera.trim() === '' || semestre.trim() === '') {
      alert('Todos los campos son obligatorios');
      return;
    }
    if (!/^\d+$/.test(semestre.trim())) {
      alert('El semestre debe contener solo números');
      return;
    }

    alert(
      'Registro enviado\n\n' +
      'Nombre: ' + nombre.trim() + '\n' +
      'Carrera: ' + carrera.trim() + '\n' +
      'Semestre: ' + semestre.trim() + '\n\n' +
      'Taller: ' + (taller ? 'Sí' : 'No') + '\n' +
      'Constancia: ' + (constancia ? 'Sí' : 'No') + '\n' +
      'Deportes: ' + (deportes ? 'Sí' : 'No')
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Registro de Evento Universitario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#888"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Carrera"
        placeholderTextColor="#888"
        value={carrera}
        onChangeText={setCarrera}
      />
      <TextInput
        style={styles.input}
        placeholder="Semestre"
        placeholderTextColor="#888"
        value={semestre}
        onChangeText={setSemestre}
      />

      <Text style={styles.subtitulo}>Opciones</Text>

      <View style={styles.fila}>
        <Text style={styles.texto}>¿Asistirá al taller?</Text>
        <Switch value={taller} onValueChange={setTaller} />
      </View>
      <View style={styles.fila}>
        <Text style={styles.texto}>¿Requiere constancia?</Text>
        <Switch value={constancia} onValueChange={setConstancia} />
      </View>
      <View style={styles.fila}>
        <Text style={styles.texto}>¿Participará en deportes?</Text>
        <Switch value={deportes} onValueChange={setDeportes} />
      </View>

      <Pressable style={styles.boton} onPress={enviar}>
        <Text style={styles.textoBoton}>Enviar Registro</Text>
      </Pressable>
    </View>
  );
}


/* Zona de estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  texto: {
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
