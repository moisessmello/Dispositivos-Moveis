import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Filme(props) {

  const { dados } = props
  console.log(props)
  
  return (
    <View style={styles.container}>

      <Text style={styles.texto}>Filmes</Text>
      <Text>Nome do filme: {dados.nome}</Text>
      <Text>Ano de lançamento: {dados.ano}</Text>
      <Text>Nome do diretor: {dados.diretor}</Text>
      <Text>Gênero do filme: {dados.tipo}</Text>
      
      

      <Image
        source={{ uri: dados.capa }}
        style={{
          height: 200,
          width: 200
        }}

      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    borderWidth: 10,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300
  },
  texto: {
    fontSize: 20,
    fontWeight: 600
  }
})