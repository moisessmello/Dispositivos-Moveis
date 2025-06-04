import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlimentacaoForm({ navigation, route }) {
  const [alimentacao, setAlimentacao] = useState({
    nome: '',
    tipo: '',
    horario: '',
    data: '',
    observacao: '',
  });

  const index = route.params?.index;

  useEffect(() => {
    if (route.params?.item) {
      setAlimentacao(route.params.item);
    }
  }, []);

  const salvar = async () => {
    const dados = await AsyncStorage.getItem('alimentacoes');
    const lista = dados ? JSON.parse(dados) : [];

    if (index >= 0) {
      lista[index] = alimentacao;
    } else {
      lista.push(alimentacao);
    }

    await AsyncStorage.setItem('alimentacoes', JSON.stringify(lista));
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label="Nome"
        value={alimentacao.nome}
        onChangeText={text => setAlimentacao({ ...alimentacao, nome: text })}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        label="Tipo"
        value={alimentacao.tipo}
        onChangeText={text => setAlimentacao({ ...alimentacao, tipo: text })}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        label="Horário"
        value={alimentacao.horario}
        onChangeText={text => setAlimentacao({ ...alimentacao, horario: text })}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        label="Data"
        value={alimentacao.data}
        onChangeText={text => setAlimentacao({ ...alimentacao, data: text })}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        label="Observação"
        value={alimentacao.observacao}
        onChangeText={text => setAlimentacao({ ...alimentacao, observacao: text })}
        style={{ marginBottom: 8 }}
      />
      <Button mode="contained" onPress={salvar}>
        Salvar
      </Button>
    </View>
  );
}
