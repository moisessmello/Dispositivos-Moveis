import { View } from "react-native";
import React, { useState } from "react";
import { Card, Text, Button } from "react-native-paper";

export default function MegaSenaScreen() {
  const [jogoAtual, setJogoAtual] = useState([]);
  const [historico, setHistorico] = useState([]);

  function gerarJogo() {
    const dezenas = [];

    while (dezenas.length < 6) {
      const numero = Math.floor(Math.random() * 60) + 1;
      if (!dezenas.includes(numero)) {
        dezenas.push(numero);
      }
    }

    dezenas.sort((a, b) => a - b);

    setJogoAtual(dezenas);
    setHistorico([...historico, dezenas]);
  }

  function resetar() {
    setJogoAtual([]);
    setHistorico([]);
  }

  return (
    <View>
      <Card>
        <Card.Content>
          <Text variant="displaySmall">Mega Sena</Text>
          <Text variant="titleLarge">Jogo Atual:</Text>
          <Text variant="headlineMedium">{jogoAtual.join(" - ")}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={resetar}>Resetar</Button>
          <Button onPress={gerarJogo}>Gerar Jogo</Button>
        </Card.Actions>
      </Card>

      <Card>
        <Card.Content>
          <Text variant="titleLarge">Histórico de Jogos</Text>
          {historico.map((jogo, index) => (
            <Text key={index} variant="labelLarge">
              {jogo.join(" - ")}
            </Text>
          ))}
        </Card.Content>
      </Card>
    </View>
  );
}
