import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { Button, Card } from 'react-native-paper'

export default function ListaScreen({ navigation, route }) {

  const carros = [
    {
      nome: "Gol",
      ano: "2012",
      cor:"Azul",
      fabricante: "Volkswagen"
    },
    {
      nome: "Civic",
      ano: "2018",
      cor:"Preto",
      fabricante: "Honda"
    },
    {
      nome: "Kadet",
      ano: "1999",
      cor:"Vermelho",
      fabricante: "Chevrolet"
    },
  ]

  return (
    <View>
      <FlatList
      data={carros}
      renderItem={({ item }) =>(
        <Card style={{ margin: 10}}>
          <Card.Content>
            <Text>Carro: {item.nome}</Text>
          </Card.Content>
          <Card.Actions>
            <Button 
            mode='contained'
            icon='arrow-right'
            onPress={() => navigation.navigate('ItemScreen', { item })}
            >
              Ver detalhes
            </Button>
          </Card.Actions>
        </Card>
      )} 
      
      />
    </View>
  )
}

const styles = StyleSheet.create({})