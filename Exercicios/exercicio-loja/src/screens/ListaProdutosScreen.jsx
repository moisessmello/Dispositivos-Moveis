import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

export default function ListaProdutosScreen({ route, navigation }) {
  const { categoria } = route.params;
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/category/${categoria}`)
      .then(response => setProdutos(response.data.products))
      .catch(error => console.error(error));
  }, []);

  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={{ margin: 10 }} onPress={() => navigation.navigate('Detalhes do Produto', { idProduto: item.id })}>
          <Card.Cover source={{ uri: item.thumbnail }} />
          <Card.Content>
            <Title>{item.title}</Title>
            <Paragraph>{item.description}</Paragraph>
          </Card.Content>
        </Card>
      )}
    />
  );
}
