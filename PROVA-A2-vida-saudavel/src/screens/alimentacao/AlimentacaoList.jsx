// src/screens/AlimentacaoList.jsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { List, IconButton, FAB, Card, Title, Paragraph, Button } from 'react-native-paper';
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
    console.log(dados)
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
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={lista}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Paragraph>Nenhum registro encontrado.</Paragraph>}
        renderItem={({ item, index }) => (
          <Card style={{marginVertical: 5}}>
            <Card.Content>
              <Title>{item.nome}</Title>
              <Paragraph>Tipo: {item.tipo}</Paragraph>
              <Paragraph>{item.data} às {item.horario}</Paragraph>
              <Paragraph>{item.observacao}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('Nova Alimentação', {
                dados: item,
              })}>Editar</Button>
              <Button onPress={() => excluir(index)}>Excluir</Button>
            </Card.Actions>
          </Card>
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