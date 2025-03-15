//import
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

// Função que define o componente
// Retornar o que vqai ser renderizado na tela (Template feito com JSX)
export default function App() {
//Lógica  do meu componente
const nome = "Moises"

function alerta() {
  alert("Clicou no botão")
}

//retorno com o JSX
  return (
    <View style={styles.container}>
      <Text>Projeto do Moises Melo</Text>
      <StatusBar style="auto" />

      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1QNd4BwasyZ3UWZkIF2x5WXfTRXiiYP4rjQ&s"
        }}

        style={{
          height: 400,
          width: 400,
        }}
      
      />

      <Text>Bem vindo {nome}</Text>

      <Button title='Clicar' onPress={alerta}></Button>
    </View>
  );
}

//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
