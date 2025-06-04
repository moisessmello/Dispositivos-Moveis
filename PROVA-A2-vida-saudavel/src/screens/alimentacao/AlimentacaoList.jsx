import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function AlimentacaoList({ navigation }) {
  const [alimentacoes, setAlimentacoes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    carregarAlimentacoes();
  }, [isFocused]);

  const carregarAlimentacoes = async () => {
    const dados = await AsyncStorage.getItem('alimentacoes');
    setAlimentacoes(dados ? JSON.parse(dados) : []);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={alimentacoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <List.Item
            title={item.nome}
            description={`Data: ${item.data}`}
            onPress={() => navigation.navigate('Editar Alimentação', { index, item })}
          />
        )}
      />
      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onPress={() => navigation.navigate('Nova Alimentação')}
      />
    </View>
  );
}
