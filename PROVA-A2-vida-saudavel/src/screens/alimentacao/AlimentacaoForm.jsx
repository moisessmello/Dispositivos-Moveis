import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Text, TextInput, Button, Menu, Divider, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';

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
    <ScrollView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: colors.primary }}>
          Registrar Alimentação
        </Text>

        {/* Nome */}
        <TextInput
          label="Nome do alimento"
          value={alimentacao.nome}
          onChangeText={text => setAlimentacao({ ...alimentacao, nome: text })}
          style={{ marginBottom: 16 }}
          mode="outlined"
        />

        {/* Tipo */}
        <Text style={{ marginBottom: 6, fontSize: 16, fontWeight: 'bold' }}>Tipo</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined" // Mantido como outlined para o botão, se desejado.
              onPress={() => setMenuVisible(true)}
              style={{
                marginBottom: 16, // Margem consistente
                justifyContent: 'flex-start',
                borderColor: '#ccc', // Cor da borda padrão para outlined
                backgroundColor: '#fff', // Fundo branco para o botão
              }}
              contentStyle={{ justifyContent: 'flex-start' }}
              labelStyle={{
                color: alimentacao.tipo ? '#000' : '#888',
                fontSize: 16,
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
          mode="outlined" // ALTERADO para outlined
          style={{ marginBottom: 16 }} // ADICIONADO para consistência de espaçamento
          render={props => (
            <TextInputMask
              {...props} // Importante: passa props do TextInput do Paper (inclui estilo para cor do texto, fonte, etc.)
              type={'custom'}
              options={{ mask: '99:99' }}
              placeholder="00:00" // Placeholder para a máscara
              // O estilo que definia a caixa (backgroundColor, padding, borderRadius, etc.) foi removido daqui
              // pois o TextInput pai com mode="outlined" cuidará disso.
            />
          )}
        />

        {/* Data */}
        <TextInput
          label="Data (DD/MM/AAAA)"
          value={alimentacao.data}
          onChangeText={text => setAlimentacao({ ...alimentacao, data: text })}
          mode="outlined" // ALTERADO para outlined
          style={{ marginBottom: 16 }} // ADICIONADO para consistência de espaçamento
          render={props => (
            <TextInputMask
              {...props} // Passa props do TextInput do Paper
              type={'datetime'}
              options={{ format: 'DD/MM/YYYY' }}
              placeholder="01/01/2025" // Placeholder para a máscara
              // Estilos da caixa removidos
            />
          )}
        />

        {/* Observação */}
        <TextInput
          label="Observação"
          value={alimentacao.observacao}
          onChangeText={text => setAlimentacao({ ...alimentacao, observacao: text })}
          style={{ marginBottom: 16 }} // ALTERADO para 16 para consistência
          mode="outlined" // Já era outlined
          multiline
          numberOfLines={3}
        />

        <Divider style={{ marginBottom: 20 }} />

        <Button
          mode="contained"
          onPress={salvar}
          style={{
            borderRadius: 8,
            paddingVertical: 10,
            backgroundColor: colors.primary,
          }}
          labelStyle={{ fontSize: 16 }}
        >
          Salvar
        </Button>
      </View>
    </ScrollView>
  );
}