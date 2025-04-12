import { StyleSheet, View } from 'react-native'
import { Text, Card, Title, Paragraph } from 'react-native-paper'
import React from 'react'

export default function EscudoScreen() {
  return (
    <View style={styles.container}>
    <Text variant='headlineLarge' style={{ textAlign: 'center' }}>Escudo</Text>

    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Title></Title>
        
      </Card.Content>
      <Card.Cover source={{ uri: 'https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg'}} 
      resizeMode='stretch' style={{height:400}}
      />
    </Card>

   


  </View>
)
}

const styles = StyleSheet.create({})