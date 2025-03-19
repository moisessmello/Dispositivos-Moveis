import React from "react";
import { StatusBar } from "expo-status-bar";
import {
Button,
Image,
StyleSheet,
Text,
View,
ScrollView,
} from "react-native";

export default function App() {

  function alerta() {
    alert("É Campeão!!!!!!!")
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.textGrande}>Barcelona</Text>
      <Text style={{ fontSize: 50, fontStyle: 'italic'}}>Futebol Clube</Text>

      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/pt/thumb/4/43/FCBarcelona.svg/2020px-FCBarcelona.svg.png"
        }}

        style={{
          height: 400,
          width: 400,
        }}
      
      />
      <Text style={styles.textGrande}>Jogadores</Text>
      
      <Image
        source={{
          uri: "https://conteudo.imguol.com.br/c/esporte/c4/2023/04/30/lamine-yamal-do-barcelona-em-acao-contra-o-betis-1682884580693_v2_1920x1279.jpg"
        }}

        style={{
          height: 400,
          width: 400,
        }}
      
      />
      <Text style={{ fontSize: 30, fontStyle: 'italic'}}>Lamine Yamal</Text>

            
      <Image
        source={{
          uri: "https://s2-ge.glbimg.com/1RR-g1QfUYgiIU-XGBS_BK2lgJM=/0x0:3023x2072/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2024/H/l/wcN3WySlup7FlBBAP3TA/gettyimages-2182669976.jpg"
        }}

        style={{
          height: 400,
          width: 400,
        }}
      
      />
      <Text style={{ fontSize: 30, fontStyle: 'italic'}}>Raphinha</Text>

      <Image
        source={{
          uri: "https://neofeed.com.br/wp-content/uploads/2021/08/messi-barcelona.jpg"
        }}

        style={{
          height: 400,
          width: 400,
        }}
      
      />
      <Text style={{ fontSize: 30, fontStyle: 'italic'}}>Lionel Messi</Text>

      <Image
        source={{
          uri: "https://www.fcbarcelona.com/fcbarcelona/photo/2020/05/07/48082955-e347-4de8-9184-c7862baae076/PIQUE_007-min.JPG"
        }}

        style={{
          height: 400,
          width: 400,
        }}
      
      />
      <Text style={{ fontSize: 30, fontStyle: 'italic'}}>Gerard Piqué</Text>

      <Image
        source={{
          uri: "https://www.lance.com.br/galerias/wp-content/uploads/2019/10/Ronaldinho.jpg"
        }}

        style={{
          height: 400,
          width: 400,
        }}
      
      />
      <Text style={{ fontSize: 30, fontStyle: 'italic'}}>Ronaldinho gaúcho</Text>

      <Text>Melhor do mundo </Text>

      <Button title='Clicar' onPress={alerta}></Button>
      
    </View>
    </ScrollView>
  );
}

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
