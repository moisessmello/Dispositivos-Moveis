// src/screens/AlimentacaoList.jsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { List, IconButton, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function AlimentacaoList({ navigation }) {
  const [lista, setLista] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    carregarDados();
  }, [isFocused]);

  const carregarDados = async () => {
    const dados = await AsyncStorage.getItem('alimentacoes');
    setLista(dados ? JSON.parse(dados) : []);
  };

  const excluir = async (index) => {
    Alert.alert('Confirmar', 'Deseja excluir este item?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          const novaLista = [...lista];
          novaLista.splice(index, 1);
          await AsyncStorage.setItem('alimentacoes', JSON.stringify(novaLista));
          setLista(novaLista);
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={lista}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <List.Item
            title={item.nome}
            description={`${item.tipo} - ${item.data} ${item.horario}`}
            onPress={() =>
              navigation.navigate('Editar Alimentação', {
                dados: item,
              })
            }
            right={() => (
              <IconButton icon="delete" onPress={() => excluir(index)} />
            )}
          />
        )}
      />
      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        onPress={() => navigation.navigate('Nova Alimentação')}
      />
      <FAB
        icon="api"
        style={{
          position: 'absolute',
          left: 16,
          bottom: 16,
          backgroundColor: 'orange',
        }}
        onPress={() => navigation.navigate('Categorias API')}
      />
    </View>
  );
}
