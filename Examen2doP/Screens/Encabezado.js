import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from "react-native";
export default function Encabezado() {
  return (
    <View style={styles.container}>
      
      <Text>Mi dia Universitario</Text>
      <Text>Organiza tus actividades</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: '5',
        width: 300,
    },
})
