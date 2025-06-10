import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, useTheme, HelperText } from 'react-native-paper';
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

  const [errors, setErrors] = useState({});
  
  const itemEditando = route.params?.dados || {};

  useEffect(() => {
    if (itemEditando.id) {
      setExercicio(itemEditando);
    }
  }, [itemEditando]);

  const salvar = async () => {
    if (!validate()) return;

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

  const validate = () => {
    const newErrors = {};
    if (!exercicio.nome) newErrors.nome = 'Nome é obrigatório';
    if (!exercicio.duracao || isNaN(Number(exercicio.duracao))) newErrors.duracao = 'Duração deve ser um número válido (minutos)';
    if (!exercicio.data) newErrors.data = 'Data é obrigatória';
    if (!exercicio.intensidade) newErrors.intensidade = 'Intensidade é obrigatória';
    if (!exercicio.descricao) newErrors.descricao = 'Descrição é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputStyle = {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
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
          {itemEditando.id ? 'Editar Exercício' : 'Registrar Exercício'}
        </Text>

        <Card style={{ padding: 16, borderRadius: 12, marginBottom: 24 }}>
          {/* Nome */}
          <TextInput
            label="Nome"
            value={exercicio.nome}
            onChangeText={text => setExercicio({ ...exercicio, nome: text })}
            error={!!errors.nome}
            mode="outlined"
            style={inputStyle}
          />
          <HelperText type="error" visible={!!errors.nome}>{errors.nome}</HelperText>

          {/* Duração */}
          <TextInput
            label="Duração (minutos)"
            value={exercicio.duracao}
            onChangeText={text => setExercicio({ ...exercicio, duracao: text })}
            keyboardType="numeric"
            error={!!errors.duracao}
            mode="outlined"
            style={inputStyle}
          />
          <HelperText type="error" visible={!!errors.duracao}>{errors.duracao}</HelperText>

          {/* Data */}
          <TextInputMask
            type={"datetime"}
            options={{ format: "DD/MM/YYYY" }}
            value={exercicio.data}
            onChangeText={text => setExercicio({ ...exercicio, data: text })}
            style={inputStyle}
            placeholder="Data (DD/MM/YYYY)"
            error={!!errors.data}
            mode="outlined"
          />
          <HelperText type="error" visible={!!errors.data}>{errors.data}</HelperText>

          {/* Intensidade */}
          <TextInput
            label="Intensidade"
            value={exercicio.intensidade}
            onChangeText={text => setExercicio({ ...exercicio, intensidade: text })}
            error={!!errors.intensidade}
            mode="outlined"
            style={inputStyle}
          />
          <HelperText type="error" visible={!!errors.intensidade}>{errors.intensidade}</HelperText>

          {/* Descrição */}
          <TextInput
            label="Descrição"
            value={exercicio.descricao}
            onChangeText={text => setExercicio({ ...exercicio, descricao: text })}
            error={!!errors.descricao}
            mode="outlined"
            multiline
            style={inputStyle}
          />
          <HelperText type="error" visible={!!errors.descricao}>{errors.descricao}</HelperText>
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
