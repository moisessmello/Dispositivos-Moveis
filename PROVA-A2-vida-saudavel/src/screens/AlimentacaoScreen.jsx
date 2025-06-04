import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlimentacaoList from './AlimentacaoList';
import AlimentacaoForm from './AlimentacaoForm';
import AlimentacaoApi from './AlimentacaoApi';

const Stack = createNativeStackNavigator();

export default function AlimentacaoScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Alimentação - CRUD" component={AlimentacaoList} />
      <Stack.Screen name="Nova Alimentação" component={AlimentacaoForm} />
      <Stack.Screen name="Editar Alimentação" component={AlimentacaoForm} />
      <Stack.Screen name="Categorias API" component={AlimentacaoApi} />
    </Stack.Navigator>
  );
}
