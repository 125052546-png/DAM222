/* zona de importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text, Button, ImageBackgroundComponent} from 'react-native';
import { useState } from 'react';
import Tarjetas from './Tarjetas'
import SafeScreen from './SafeScreen'
import SwitchScreen from '../components/SwitchScreen'
import TxtInput from './TxtInput';
import FlatListScreen from './FlatListScreen';
import ImageBgScreen from './ImageBgScreen'
import ModalScreen from './ModalScreen'
import ActivityScreen from './ActivityScreen'
import ScrollScreen from './ScrollScreen'
import KeyboardScreen from './KeyboardScreen'
import PressableScreen from './PressableScreen';

/* zona del main */

export default function MenuScreen() {
         const[screen,setScreen] = useState('menu');

         switch(screen){
             case 'tarjetas':
                 return <Tarjetas/>
             case 'safeScreen':
                 return <SafeScreen/>
            case 'scroll':
                return <ScrollScreen/>
            case 'switch':
                return <SwitchScreen/>
            case 'pressable':
                return <PressableScreen/>
            case 'textinput':
                return <TxtInput/>
            case 'flatlist':
                return <FlatListScreen/>
            case 'imagebg':
                return <ImageBgScreen/>
            case 'modal':
                return <ModalScreen/>
            case 'activity':
                return <ActivityScreen/>
            case 'keyboard':
                return <KeyboardScreen/>
             case 'menu':
                 default:
                 return (
                <View style={styles.container}>

                    <Text>Menu de practicas</Text>
                    
                    <Button title='Tarjetas' onPress={()=> setScreen('tarjetas')}></Button>
                    <Button title='SafeAreaView' onPress={()=> setScreen('safeScreen')}></Button>
                    <Button title='ScrollView' onPress={()=> setScreen('scroll')}></Button>
                    <Button title='Swtich' onPress={()=> setScreen('switch')}></Button>
                    <Button title='Pressable' onPress={()=> setScreen('pressable')}></Button>
                    <Button title='TextInput' onPress={()=> setScreen('textinput')}></Button>
                    <Button title='FlatList' onPress={()=> setScreen('flatlist')}></Button>
                    <Button title='ImageBackground' onPress={()=> setScreen('imagebg')}></Button>
                    <Button title='Modal' onPress={()=> setScreen('modal')}></Button>
                    <Button title='ActivityIndicator' onPress={()=> setScreen('activity')}></Button>
                    <Button title='KeyboardAvoidingView' onPress={()=> setScreen('keyboard')}></Button>

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
