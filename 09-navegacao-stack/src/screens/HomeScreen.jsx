import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'

export default function HomeScreen(props) {

const {  navigation, route } = props

// Serve pra navegar entrea as telas
console.log("NAVIGATION => ", navigation)

// Pegar os parâmetros e dados da rota
console.log("ROUTE =>", route)

  return (
    <View>
      <Text>HomeScreen</Text>

      <Button
      mode='contained'
      onPress={() => navigation.navigate('ProfileScreen')}
      >
        Ir para a tela profile
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({})