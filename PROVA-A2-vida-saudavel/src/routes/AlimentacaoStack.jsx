import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlimentacaoList from '../screens/alimentacao/AlimentacaoList';
import AlimentacaoForm from '../screens/alimentacao/AlimentacaoForm';
import AlimentacaoApi from '../screens/alimentacao/AlimentacaoApi';


const Stack = createNativeStackNavigator();

export default function AlimentacaoScreens() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Alimentação - CRUD" component={AlimentacaoList} />
      <Stack.Screen name="Nova Alimentação" component={AlimentacaoForm} />
      <Stack.Screen name="Editar Alimentação" component={AlimentacaoForm} />
      <Stack.Screen name="Categorias API" component={AlimentacaoApi} />
    </Stack.Navigator>
  );
}
