/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View} from 'react-native';
import MenuScreen from './screens/MenuScreen';

/* zona del main */
export default function App() {
    return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <MenuScreen></MenuScreen>
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
