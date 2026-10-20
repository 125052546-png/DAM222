import {Text,View, Button, StyleSheet} from 'react-native';
import {useState} from 'react'

export const Perfil=({nombre, carrera,materia,cuatri, style}) =>{

        const[mostrar,setMostrar] = useState(false);
    return (

        <View style ={estilos.tarjeta,style}> 
            <Text style={estilos.nombre}>{nombre}</Text>

            {mostrar &&
                <>
            <Text style = {estilos.carrera}>{carrera}</Text>
            <Text style = {estilos.otro}>{materia}</Text>
            <Text style = {estilos.otro}>{cuatri}</Text>
            </>
            }
            <Button title = "Ver perfil" onPress={() =>setMostrar(!mostrar) }/>
        </View>
    )
}

const estilos = StyleSheet.create({
    nombre:{
        fontSize:24,
        fontWeight:600,
        textTransform:'uppercase',
        

    },
    carrera:{
        fontSize:18,
        color:'purple',
        fontFamily:'Roboto'

    },
    otro:{
        fontSize:12,
        fontFamily:'Courier',
        fontStyle:'italic'

    },

    
});