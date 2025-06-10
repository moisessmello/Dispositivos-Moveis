import { useState, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Card,
  Title,
  Paragraph,
  FAB
} from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

export default function ConsultasScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const isFocuseed = useIsFocused();

  useEffect(() => {
    loadItems();
  }, [isFocuseed]);

  async function loadItems() {
    const stored = await AsyncStorage.getItem("consultas");
    if (stored) setItems(JSON.parse(stored));
  }

  async function saveItems(newItems) {
    setItems(newItems);
    await AsyncStorage.setItem("consultas", JSON.stringify(newItems));
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
              <Title>{item.aluno}</Title>
              <Paragraph>Local: {item.local}</Paragraph>
              <Paragraph>
                {item.data} às {item.hora}
              </Paragraph>
              <Paragraph>{item.descricao}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('EditarConsultasForm', {dados: item})}>Editar</Button>
              <Button onPress={() => remove(item.id)} color="red">
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        onPress={() => navigation.navigate('ConsultasForm')}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
        }}
      />
    </View>
  );
}
