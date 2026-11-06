/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text, Button} from 'react-native';
import { useState } from 'react';
import FlatListScreen from './FlatListScreen';
import SectionListScreen from './SectionListScreen';

/* zona del main */

export default function MenuScreen() {
         const[screen,setScreen] = useState('menu');

         switch(screen){
            case 'flatlist':
                return <FlatListScreen/>
            case 'sectionlist':
                return <SectionListScreen/>
             case 'menu':
                 default:
                 return (
                <View style={styles.container}>

                    <Text>Menu de practicas</Text>

                    <Button title='FlatList' onPress={()=> setScreen('flatlist')}></Button>
                    <Button title='SectionList' onPress={()=> setScreen('sectionlist')}></Button>

                    <StatusBar style='auto'/>


                </View>

  );
  } /* switch */
} /* funcion */



/* Zona de estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
