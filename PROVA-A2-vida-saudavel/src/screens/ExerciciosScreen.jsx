import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Card, Title, Paragraph, FAB, Portal, Dialog, HelperText } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

export default function ExerciciosScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [nome, setNome] = useState('');
  const [duracao, setDuracao] = useState('');
  const [data, setData] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [descricao, setDescricao] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const stored = await AsyncStorage.getItem('exercicios');
    if (stored) setItems(JSON.parse(stored));
  }

  async function saveItems(newItems) {
    setItems(newItems);
    await AsyncStorage.setItem('exercicios', JSON.stringify(newItems));
  }

  function resetForm() {
    setNome('');
    setDuracao('');
    setData('');
    setIntensidade('');
    setDescricao('');
    setCurrentId(null);
    setErrors({});
  }

  function openDialog(item = null) {
    if (item) {
      setCurrentId(item.id);
      setNome(item.nome);
      setDuracao(item.duracao.toString());
      setData(item.data);
      setIntensidade(item.intensidade);
      setDescricao(item.descricao);
    } else {
      resetForm();
    }
    setVisible(true);
  }

  function closeDialog() {
    resetForm();
    setVisible(false);
  }

  function validate() {
    const newErrors = {};
    if (!nome) newErrors.nome = 'Nome é obrigatório';
    if (!duracao || isNaN(Number(duracao))) newErrors.duracao = 'Duração deve ser número válido (minutos)';
    if (!data) newErrors.data = 'Data é obrigatória';
    if (!intensidade) newErrors.intensidade = 'Intensidade é obrigatória';
    if (!descricao) newErrors.descricao = 'Descrição é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function save() {
    if (!validate()) return;

    let newItems = [...items];
    if (currentId) {
      newItems = newItems.map(i =>
        i.id === currentId
          ? { id: currentId, nome, duracao: Number(duracao), data, intensidade, descricao }
          : i
      );
    } else {
      newItems.push({
        id: Date.now().toString(),
        nome,
        duracao: Number(duracao),
        data,
        intensidade,
        descricao,
      });
    }
    await saveItems(newItems);
    closeDialog();
  }

  async function remove(id) {
    Alert.alert('Confirmar', 'Deseja excluir este registro?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          const filtered = items.filter(i => i.id !== id);
          await saveItems(filtered);
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Paragraph>Nenhum registro encontrado.</Paragraph>}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 5 }}>
            <Card.Content>
              <Title>{item.nome}</Title>
              <Paragraph>Duração: {item.duracao} minutos</Paragraph>
              <Paragraph>Data: {item.data}</Paragraph>
              <Paragraph>Intensidade: {item.intensidade}</Paragraph>
              <Paragraph>Descrição: {item.descricao}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => openDialog(item)}>Editar</Button>
              <Button onPress={() => remove(item.id)} color="red">Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={closeDialog}>
          <Dialog.Title>{currentId ? 'Editar' : 'Novo'} Exercício</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
              <TextInput
                label="Nome"
                value={nome}
                onChangeText={setNome}
                error={!!errors.nome}
                mode="outlined"
                style={{ marginBottom: 10 }}
              />
              <HelperText type="error" visible={!!errors.nome}>{errors.nome}</HelperText>

              <TextInput
                label="Duração (minutos)"
                value={duracao}
                onChangeText={setDuracao}
                keyboardType="numeric"
                error={!!errors.duracao}
                mode="outlined"
                style={{ marginBottom: 10 }}
              />
              <HelperText type="error" visible={!!errors.duracao}>{errors.duracao}</HelperText>

              <TextInputMask
                type={"datetime"}
                options={{ format: "DD/MM/YYYY" }}
                value={data}
                onChangeText={setData}
                style={{
                  backgroundColor: 'white',
                  marginBottom: 10,
                  paddingHorizontal: 12,
                  borderRadius: 4,
                  borderColor: errors.data ? 'red' : '#AAA',
                  borderWidth: 1,
                  height: 56,
                  justifyContent: 'center',
                }}
                placeholder="Data (DD/MM/AAAA)"
                keyboardType="numeric"
              />
              <HelperText type="error" visible={!!errors.data}>{errors.data}</HelperText>

              <TextInput
                label="Intensidade"
                value={intensidade}
                onChangeText={setIntensidade}
                error={!!errors.intensidade}
                mode="outlined"
                style={{ marginBottom: 10 }}
              />
              <HelperText type="error" visible={!!errors.intensidade}>{errors.intensidade}</HelperText>

              <TextInput
                label="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                error={!!errors.descricao}
                mode="outlined"
                multiline
                style={{ marginBottom: 10 }}
              />
              <HelperText type="error" visible={!!errors.descricao}>{errors.descricao}</HelperText>
            </ScrollView>
          </Dialog.ScrollArea>

          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancelar</Button>
            <Button onPress={save}>Salvar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        onPress={() => openDialog()}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
        }}
      />
    </View>
  );
}
