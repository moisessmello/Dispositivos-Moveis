import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { Text, TextInput, Button, Card, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ExercicioForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();

  const [exercicio, setExercicio] = useState({
    id: Date.now(),
    nome: '',
    duracao: '',
    data: '',
    intensidade: '',
    descricao: '',
  });

  const itemEditando = route.params?.dados || {};

  useEffect(() => {
    if (itemEditando.id) {
      setExercicio(itemEditando);
    }
  }, [itemEditando]);

  const salvar = async () => {
    if (!exercicio.nome || !exercicio.duracao || !exercicio.data || !exercicio.intensidade || !exercicio.descricao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const novoExercicio = {
      ...exercicio,
      duracao: Number(exercicio.duracao),
    };

    const stored = await AsyncStorage.getItem('exercicios');
    let items = stored ? JSON.parse(stored) : [];

    if (itemEditando.id) {
      items = items.map(item => (item.id === exercicio.id ? novoExercicio : item));
    } else {
      items.push(novoExercicio);
    }

    await AsyncStorage.setItem('exercicios', JSON.stringify(items));
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
          Registrar Exercício
        </Text>

        <Card style={{ padding: 16, borderRadius: 12, marginBottom: 24 }}>
          {/* Nome */}
          <TextInput
            label="Nome"
            value={exercicio.nome}
            onChangeText={text => setExercicio({ ...exercicio, nome: text })}
            style={{ marginBottom: 16 }}
            mode="outlined"
            theme={{ roundness: 8 }}
          />

          {/* Duração */}
          <TextInput
            label="Duração (minutos)"
            value={exercicio.duracao}
            onChangeText={text => setExercicio({ ...exercicio, duracao: text })}
            keyboardType="numeric"
            mode="outlined"
            style={{ marginBottom: 16 }}
            theme={{ roundness: 8 }}
          />

          {/* Data */}
          <TextInputMask
            type={'datetime'}
            options={{ format: 'DD/MM/YYYY' }}
            value={exercicio.data}
            onChangeText={text => setExercicio({ ...exercicio, data: text })}
            placeholder="Data"
            style={{ marginBottom: 16 }}
          />

          {/* Intensidade */}
          <TextInput
            label="Intensidade"
            value={exercicio.intensidade}
            onChangeText={text => setExercicio({ ...exercicio, intensidade: text })}
            mode="outlined"
            style={{ marginBottom: 16 }}
            theme={{ roundness: 8 }}
          />

          {/* Descrição */}
          <TextInput
            label="Descrição"
            value={exercicio.descricao}
            onChangeText={text => setExercicio({ ...exercicio, descricao: text })}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={{ marginBottom: 16 }}
            theme={{ roundness: 8 }}
          />
        </Card>

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
    </KeyboardAwareScrollView>
  );
}
