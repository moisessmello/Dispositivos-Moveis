import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, Card, Title, Paragraph, Divider, Button } from 'react-native-paper';


export default function App() {
  return (
    <PaperProvider>

      <View style={styles.container}>
        <Text></Text>
        <StatusBar style="auto" />

        <Button mode='contained' onPress={() => alert("Clicou")}>Clique Aqui</Button>
        <Button icon="camera" mode="contained-tonal" >Clique aqui</Button>
        <Button mode='contained-total' >Clique Aqui</Button>
        <Button mode='elevated' >Clique Aqui</Button>
        <Button mode='outlined' >Clique Aqui</Button>
        <Button mode='text' >Clique Aqui</Button>


        <Text>Uva</Text>
        <Divider style={{width: '80%'}} />
        <Text>Pera</Text>
        <Divider style={{width: '80%'}} />
        <Text>Maçã</Text>
        <Divider style={{width: '80%'}} />
        <Text>Banana</Text>
        <Divider style={{width: '80%'}} />

        <Text variant='titleLarge' >Um texto qualquer</Text>
        
        <Card>
          <Card.Content>
            <Title>Titulo do card</Title>
            <Paragraph>Um parágrafo qualquer, Um parágrafo qualquer, Um parágrafo qualquer,
            Um parágrafo qualquer,</Paragraph>
          </Card.Content>
          <Card.Cover source={{}}/>
        </Card>


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
