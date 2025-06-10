import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { Text, TextInput, Button, Menu, Divider, useTheme, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AlimentacaoForm({ navigation, route }) {
  const { colors } = useTheme();

  const [alimentacao, setAlimentacao] = useState({
    id: Date.now(),
    nome: '',
    tipo: '',
    horario: '',
    data: '',
    observacao: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const itemEditando = route.params?.dados;

  useEffect(() => {
    if (itemEditando) setAlimentacao(itemEditando);
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      const nomes = response.data.categories.map(cat => cat.strCategory);
      setCategorias(nomes);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const salvar = async () => {
    if (!alimentacao.nome || !alimentacao.tipo || !alimentacao.horario || !alimentacao.data) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const dados = await AsyncStorage.getItem('alimentacoes');
    let lista = dados ? JSON.parse(dados) : [];

    const index = lista.findIndex(item => item.id === alimentacao.id);
    if (index >= 0) {
      lista[index] = alimentacao;
    } else {
      lista.push(alimentacao);
    }

    await AsyncStorage.setItem('alimentacoes', JSON.stringify(lista));
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: '#f1f1f1' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
    >
      <View style={{ padding: 20, flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: colors.primary }}>
          Registrar Alimentação
        </Text>

        <Card style={{ padding: 16, borderRadius: 12, marginBottom: 24 }}>
          {/* Nome */}
          <TextInput
            label="Nome do aluno"
            value={alimentacao.nome}
            onChangeText={text => setAlimentacao({ ...alimentacao, nome: text })}
            style={{ marginBottom: 16, borderRadius: 8 }}
            mode="outlined"
            theme={{ roundness: 8 }}
          />

          {/* Tipo */}
          <Text style={{ marginBottom: 6, fontSize: 16, fontWeight: 'bold' }}>Tipo</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMenuVisible(true)}
                style={{
                  marginBottom: 16,
                  justifyContent: 'flex-start',
                  borderColor: '#ccc',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                }}
                contentStyle={{ justifyContent: 'flex-start', paddingVertical: 8 }}
                labelStyle={{
                  color: alimentacao.tipo ? '#000' : '#888',
                  fontSize: 16,
                  textAlign: 'left'
                }}
              >
                {alimentacao.tipo || 'Selecione o tipo'}
              </Button>
            }
          >
            {categorias.map((cat, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setAlimentacao({ ...alimentacao, tipo: cat });
                  setMenuVisible(false);
                }}
                title={cat}
              />
            ))}
          </Menu>

          {/* Horário */}
          <TextInput
            label="Horário (HH:MM)"
            value={alimentacao.horario}
            onChangeText={text => setAlimentacao({ ...alimentacao, horario: text })}
            mode="outlined"
            style={{ marginBottom: 16, borderRadius: 8 }}
            theme={{ roundness: 8 }}
            keyboardType="numeric"
            render={props => (
              <TextInputMask
                {...props}
                type={'custom'}
                options={{ mask: '99:99' }}
                placeholder="00:00"
              />
            )}
          />

          {/* Data */}
          <TextInput
            label="Data (DD/MM/AAAA)"
            value={alimentacao.data}
            onChangeText={text => setAlimentacao({ ...alimentacao, data: text })}
            mode="outlined"
            style={{ marginBottom: 16, borderRadius: 8 }}
            theme={{ roundness: 8 }}
            keyboardType="numeric"
            render={props => (
              <TextInputMask
                {...props}
                type={'datetime'}
                options={{ format: 'DD/MM/YYYY' }}
                placeholder="01/01/2025"
              />
            )}
          />

          {/* Observação */}
          <TextInput
            label="Observação"
            value={alimentacao.observacao}
            onChangeText={text => setAlimentacao({ ...alimentacao, observacao: text })}
            style={{ marginBottom: 16, borderRadius: 8 }}
            mode="outlined"
            theme={{ roundness: 8 }}
            multiline
            numberOfLines={3}
          />
        </Card>

        <Button
          mode="contained"
          onPress={salvar}
          style={{
            borderRadius: 8,
            paddingVertical: 5,
            backgroundColor: colors.primary,
          }}
          labelStyle={{ fontSize: 16 }}
        >
          Salvar
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => navigation.goBack()}
          style={{
            borderRadius: 8,
            paddingVertical: 5,
            marginTop: 10
          }}
          labelStyle={{ fontSize: 16 }}
        >
          Voltar
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}