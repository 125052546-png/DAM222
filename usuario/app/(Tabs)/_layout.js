import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function TabsLayout(){
    return(
        <Tabs>
            <Tabs.Screen name="index" options={{title: "Inicio",href:null,}}/>
            <Tabs.Screen name="alta" options={{title: "Formulario",tabBarIcon:({size,color})=> (
                    <Ionicons name="person-add" size={15} color={"red"}/>
                    )
                }}
            />
            <Tabs.Screen name="consulta" options={{title: "Listado", tabBarIcon:({size,color})=> (
                    <Ionicons name="list" size={15} color={"red"}/>
                    )
                }}
            />
        </Tabs>
    );
}