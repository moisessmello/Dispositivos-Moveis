import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Text } from 'react-native-paper';
import axios from 'axios';

export default function AlimentacaoApi() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => {
        setCategorias(response.data.categories);
        setCarregando(false);
      })
      .catch(error => {
        console.error('Erro ao buscar categorias:', error);
        setErro('Não foi possível carregar as categorias.');
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <ActivityIndicator animating={true} style={{ marginTop: 20 }} />;
  }

  if (erro) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>{erro}</Text>;
  }

  return (
    <ScrollView style={{ padding: 10 }}>
      {categorias.map((cat) => (
        <Card key={cat.idCategory} style={{ marginBottom: 15 }}>
          <Card.Cover source={{ uri: cat.strCategoryThumb }} />
          <Card.Content>
            <Title>{cat.strCategory}</Title>
            <Paragraph>{cat.strCategoryDescription.substring(0, 100)}...</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}
