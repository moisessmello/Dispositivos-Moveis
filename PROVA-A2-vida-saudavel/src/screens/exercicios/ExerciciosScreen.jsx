import { useState, useEffect } from 'react';
import { View, FlatList, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

export default function ExerciciosScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const isFocuseed = useIsFocused();

  useEffect(() => {
    loadItems();
  }, [isFocuseed]);

  async function loadItems() {
    const stored = await AsyncStorage.getItem('exercicios');
    if (stored) setItems(JSON.parse(stored));
  }

  async function remove(id) {
    Alert.alert('Confirmar', 'Deseja excluir este registro?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          const filtered = items.filter(i => i.id !== id);
          await saveItems(filtered);
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Paragraph>Nenhum registro encontrado.</Paragraph>}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 5 }}>
            <Card.Content>
              <Title>{item.nome}</Title>
              <Paragraph>Duração: {item.duracao} minutos</Paragraph>
              <Paragraph>Data: {item.data}</Paragraph>
              <Paragraph>Intensidade: {item.intensidade}</Paragraph>
              <Paragraph>Descrição: {item.descricao}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('EditarExerciciosForm', { dados: item })}>Editar</Button>
              <Button onPress={() => remove(item.id)} color="red">Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        onPress={() => navigation.navigate('ExerciciosForm')}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
        }}
      />
    </View>
  );
}
