import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';

// Segundos que dura el splash antes de mostrar la bienvenida
const DURACION_SPLASH = 3000;

export default function ImageBgScreen() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMostrarSplash(false), DURACION_SPLASH);
    return () => clearTimeout(timer);
  }, []);

  // Splash screen: se ve unos segundos y luego pasa a la bienvenida
  if (mostrarSplash) {
    return (
      <View style={styles.splash}>
        <Image
          source={require('../assets/splash-icon.png')}
          style={styles.splashLogo}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.splashTexto}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/wave.png')} 
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.titulo}>¡BIENVENIDO!</Text>
        <Text style={styles.subtitulo}>Comienza tu aventura</Text>

        <Pressable
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
          ]}
          onPress={() => Alert.alert('Bienvenido', 'Has presionado Entrar')}
        >
          <Text style={styles.textoBoton}>Entrar</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#082B49',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  splashTexto: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 12,
  },
  fondo: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Overlay semitransparente para contraste
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    color: '#E0E0E0',
    marginBottom: 40,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#8A5CF5',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
    elevation: 3,
  },
  botonPresionado: {
    opacity: 0.8,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});