import {Stack} from "expo-router";

export default function RootLayout(){
    return(
        <Stack>
        <Stack.Screen name="(Tabs)" options={{headerShown: false}}/>
        
        <Stack.Screen name="detalle" options={{title:"Detalle del usuario"}}/>
        <Stack.Screen name="actualiza" options={{title:"Actualizar el usuario"}}/> 
            
        </Stack>
    );
}