//import
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native';

// Função que define o componente
// Retornar o que vqai ser renderizado na tela (Template feito com JSX)
export default function App() {
//Lógica  do meu componente
const nome = "Moises"

function alerta() {
  alert("Clicou no botão")
}

// retorno desta função do template de como vai ser
//retorno com o JSX
  return (
// Scolviw permite que o conteudo vá até  até depois da barra de rolagem
// não pode ser usado sozinho, tem que ter uma viw dentro
// ele só envolve o conteudo
    <ScrollView>
    <View style={styles.container}>
      
      {/* <StatusBar style="auto" /> */}
      <Text style={{ fontSize: 50, fontStyle: 'italic'}}>Projeto do Moises Melo</Text>
      <Text style={styles.textGrande}>Bora tomar chá</Text>
      
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1QNd4BwasyZ3UWZkIF2x5WXfTRXiiYP4rjQ&s"
        }}

        style={{
          height: 400,
          width: 400,
        }}
      
      />
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1QNd4BwasyZ3UWZkIF2x5WXfTRXiiYP4rjQ&s"
        }}

        style={{
          height: 400,
          width: 400,
        }}
      
      />
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1QNd4BwasyZ3UWZkIF2x5WXfTRXiiYP4rjQ&s"
        }}

        style={{
          height: 400,
          width: 400,
        }}
      
      />
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1QNd4BwasyZ3UWZkIF2x5WXfTRXiiYP4rjQ&s"
        }}


        style={{
          height: 400,
          width: 400,
        }}
      
      />
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
    </ScrollView>
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
  
  textGrande: {
    fontSize: 40,
    fontWeight: 900
  },
  spacer:{
    height: 30,
  }

});
