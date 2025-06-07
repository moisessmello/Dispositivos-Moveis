import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  FAB,
  Portal,
  Dialog,
  HelperText,
} from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";

export default function ConsultasScreen() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [medico, setMedico] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const stored = await AsyncStorage.getItem("consultas");
    if (stored) setItems(JSON.parse(stored));
  }

  async function saveItems(newItems) {
    setItems(newItems);
    await AsyncStorage.setItem("consultas", JSON.stringify(newItems));
  }

  function resetForm() {
    setMedico("");
    setData("");
    setHora("");
    setLocal("");
    setDescricao("");
    setErrors({});
    setCurrentId(null);
  }

  function openDialog(item = null) {
    if (item) {
      setCurrentId(item.id);
      setMedico(item.medico);
      setData(item.data);
      setHora(item.hora);
      setLocal(item.local);
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
    if (!medico) newErrors.medico = "Campo obrigatório";
    if (!data) newErrors.data = "Campo obrigatório";
    if (!hora) newErrors.hora = "Campo obrigatório";
    if (!local) newErrors.local = "Campo obrigatório";
    if (!descricao) newErrors.descricao = "Campo obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function save() {
    if (!validate()) return;

    let newItems = [...items];
    if (currentId) {
      newItems = newItems.map((i) =>
        i.id === currentId
          ? { id: currentId, medico, data, hora, local, descricao }
          : i
      );
    } else {
      newItems.push({
        id: Date.now().toString(),
        medico,
        data,
        hora,
        local,
        descricao,
      });
    }
    await saveItems(newItems);
    closeDialog();
  }

  async function remove(id) {
    Alert.alert("Confirmar", "Deseja excluir este registro?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        onPress: async () => {
          const filtered = items.filter((i) => i.id !== id);
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
              <Title>{item.medico}</Title>
              <Paragraph>Local: {item.local}</Paragraph>
              <Paragraph>
                {item.data} às {item.hora}
              </Paragraph>
              <Paragraph>{item.descricao}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => openDialog(item)}>Editar</Button>
              <Button onPress={() => remove(item.id)} color="red">
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={closeDialog}>
          <Dialog.Title>{currentId ? "Editar" : "Nova"} Consulta</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
              <TextInput
                label="Médico"
                value={medico}
                onChangeText={setMedico}
                error={!!errors.medico}
                mode="outlined"
                style={{ marginBottom: 10 }}
              />
              <HelperText type="error" visible={!!errors.medico}>
                {errors.medico}
              </HelperText>

              <TextInputMask
                type={"datetime"}
                options={{ format: "DD/MM/YYYY" }}
                value={data}
                onChangeText={setData}
                placeholder="Data (DD/MM/AAAA)"
                mode="outlined"
                error={!!errors.data}
                style={{ marginBottom: 10 }}
              />
              <HelperText type="error" visible={!!errors.data}>
                {errors.data}
              </HelperText>

              <TextInputMask
                type={"custom"}
                options={{ mask: "99:99" }}
                value={hora}
                onChangeText={setHora}
                placeholder="Hora (HH:MM)"
                mode="outlined"
                error={!!errors.hora}
                style={{ marginBottom: 10 }}
              />
              <HelperText type="error" visible={!!errors.hora}>
                {errors.hora}
              </HelperText>

              <TextInput
                label="Local"
                value={local}
                onChangeText={setLocal}
                error={!!errors.local}
                mode="outlined"
                style={{ marginBottom: 10 }}
              />
              <HelperText type="error" visible={!!errors.local}>
                {errors.local}
              </HelperText>

              <TextInput
                label="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                error={!!errors.descricao}
                mode="outlined"
                multiline
                style={{ marginBottom: 10 }}
              />
              <HelperText type="error" visible={!!errors.descricao}>
                {errors.descricao}
              </HelperText>
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
          position: "absolute",
          right: 20,
          bottom: 20,
        }}
      />
    </View>
  );
}
