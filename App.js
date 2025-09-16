
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './src/pages/Inicio';
import Home from './src/pages/Home/index';
import Contato from './src/pages/Contato/index';
import Login from './src/pages/Login/index';
import Cadastro from './src/pages/Cadastro/index';
import Favoritos from './src/pages/Favoritos/index';
import Leao from './src/pages/Leao/index';
import Coelho from './src/pages/Coelho/index';
import Sobre from './src/pages/Sobre/index';
import Carrinho from './src/pages/Carrinho/index'
import Admin from './src/pages/Admin';




const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Contato" component={Contato} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
        <Stack.Screen name="Leao" component={Leao} />
        <Stack.Screen name="Coelho" component={Coelho} />
        <Stack.Screen name="Sobre" component={Sobre} />
        <Stack.Screen name="Carrinho" component={Carrinho} />
        <Stack.Screen name="Admin" component={Admin} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}