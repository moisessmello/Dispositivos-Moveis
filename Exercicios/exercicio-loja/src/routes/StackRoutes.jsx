import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ListaProdutosScreen from '../screens/ListaProdutosScreen';
import ProdutoScreen from '../screens/ProdutoScreen';

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Produtos" component={ListaProdutosScreen} />
      <Stack.Screen name="Detalhes do Produto" component={ProdutoScreen} />
    </Stack.Navigator>
  );
}
