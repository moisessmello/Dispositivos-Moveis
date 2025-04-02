import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { PaperProvider, Card, Title, Paragraph, Divider, Button } from 'react-native-paper';


export default function App() {

  const lista = [
    {
      titulo: 'Card1',
      descricao: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
      imagem: 'https://i.pinimg.com/474x/9a/a7/c9/9aa7c9656614abf9bbbcc8425c878dca.jpg'
    },
    {
      titulo: 'Card2',
      descricao: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
      imagem: 'https://i.pinimg.com/474x/9a/a7/c9/9aa7c9656614abf9bbbcc8425c878dca.jpg'
    },
    {
      titulo: 'Card3',
      descricao: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
      imagem: 'https://i.pinimg.com/474x/9a/a7/c9/9aa7c9656614abf9bbbcc8425c878dca.jpg'
    },
    {
      titulo: 'Card4',
      descricao: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
      imagem: 'https://i.pinimg.com/474x/9a/a7/c9/9aa7c9656614abf9bbbcc8425c878dca.jpg'
    }
  ]
  return (

    

    <PaperProvider>

      <View style={styles.container}>
        <Text></Text>
        <StatusBar style="auto" />

 
        <FlatList
        horizontal
          data={lista}
          renderItem={({ item }) => (
            <Card>
              <Card.Content>
                <Title>{item.titulo}</Title>
                <Paragraph>{item.descricao}</Paragraph>
                <Card.Cover source={{uri: item.imagem}}/>
              </Card.Content>
            </Card>
          )} />

        <FlatList 
          data={lista}
          renderItem={({ item }) => (
            <Card>
              <Card.Content>
                <Title>{item.titulo}</Title>
                <Paragraph>{item.descricao}</Paragraph>
                <Card.Cover source={{uri: item.imagem}}/>
              </Card.Content>
            </Card>
          )} />




      </View>

    </PaperProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

