import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Card, Title } from 'react-native-paper'

export default function ReceitaScreen( {navigation, route}) {

  const receita = route.params.item

  return (
    <View>
      <Card>
        <Card.Content>
          <Text>Nome: {receita.nome}</Text>
          <Text>Tempo de preparo: {receita.tempoPreparo}</Text>
          <Text>Porções: {receita.porcoes}</Text>
          <Card.Cover source={{uri: receita.imagem}}/>
          <Title>Ingredientes</Title>
          <FlatList 
            data={receita.ingredientes}
            renderItem={({item}) => <Text>{item}</Text>}
          />
          <Title>Modo de Preparo</Title>
          <FlatList
            data={receita.modoPreparo}
            renderItem={({item})  =><Text>{item}</Text>}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode='contained-tonal'
            icon='arrow-left'
            onPress={() => navigation.goBack()}
          >
            Voltar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({})