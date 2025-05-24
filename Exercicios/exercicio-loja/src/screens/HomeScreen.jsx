import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(response => setCategorias(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <FlatList
  data={categorias}
  keyExtractor={(item) => item.slug}
  renderItem={({ item }) => (
    <List.Item
      title={item.name} // ✅ Aqui
      onPress={() => navigation.navigate('Produtos', { categoria: item.slug })}
    />
  )}
/>

  );
}
