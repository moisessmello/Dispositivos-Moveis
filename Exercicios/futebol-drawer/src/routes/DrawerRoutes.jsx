import {createDrawerNavigator} from '@react-navigation/drawer'

import { Ionicons } from '@expo/vector-icons'

import EscudoScreen from '../screens/EscudoScreen'
import JogadorScreen from '../screens/JogadoresScreen'
import TituloScreen from '../screens/TitulosScreen'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator>
    <Drawer.Screen 
    name='EscudoScreen' 
    component={EscudoScreen}
    options={{
        title: "Início",
        drawerIcon: ({ color, size }) => <Ionicons name='shield' color={color}
        size={size} />
    }}
    />
    
    <Drawer.Screen 
    name='JogadorScreen' 
    component={JogadorScreen}
    options={{
        title: "Jogador",
        drawerIcon: ({ color, size }) => <Ionicons name='accessibility' color={color}
        size={size} />
    }}
    />
    
    <Drawer.Screen 
    name='TituloScreen' 
    component={TituloScreen}
    options={{
        title: "Títulos",
        drawerIcon: ({ color, size }) => <Ionicons name='trophy' color={color}
        size={size} />
    }}
    />
</Drawer.Navigator>

    
  )
}

