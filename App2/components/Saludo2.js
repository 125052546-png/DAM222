import {Text, Image, Button,View} from 'react-native';

export const Saludo2=() =>{
    return (

        <View> 
            <Text>Hola RN soy un componente propio</Text>
            <Image source={require('../assets/wave.png')}></Image>
            <Button title='Presiona para saludar'></Button>

        </View>
    )
}