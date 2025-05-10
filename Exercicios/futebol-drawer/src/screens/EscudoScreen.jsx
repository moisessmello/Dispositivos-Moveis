import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler';

export default function EscudoScreen() {

  const time = {
    nome: "Flamengo",
    escudo: "https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg",
    fundacao: "15 de novembro de 1895",
    estadio: "Maracanã",
    mascote: "Urubu",
    cores: ["Vermelho", "Preto"]
    };
  
    return (
    <View>
      <Text>
        {time.nome}        
      </Text>
      <Image
      source={{uri: time.escudo}} width={250} height={250}
      />
      <Text>
        {time.fundacao}        
      </Text>
      <Text>
        {time.estadio}        
      </Text>
      <Text>
        {time.mascote}        
      </Text>
      <FlatList
      data={time.cores}
      renderItem={({item}) => <Text>{item}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({})