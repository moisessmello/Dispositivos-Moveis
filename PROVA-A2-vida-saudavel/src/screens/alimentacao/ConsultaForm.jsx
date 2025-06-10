import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ConsultaForm({ navigation, route }) {
  const [consulta, setConsulta] = useState({
    id: Date.now(),
    aluno: "", // Alterado de 'medico' para 'aluno'
    data: "",
    hora: "",
    local: "",
    descricao: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (route.params?.dados) {
      setConsulta(route.params.dados);
    }
  }, [route.params]);

  const salvarConsulta = async () => {
    const { aluno, data, hora, local, descricao } = consulta; // Alterado de 'medico' para 'aluno'

    // Verificação de campos obrigatórios
    if (!aluno || !data || !hora || !local || !descricao) { // Alterado de 'medico' para 'aluno'
      setErrors({ message: "Todos os campos são obrigatórios!" });
      return;
    }

    const dados = await AsyncStorage.getItem("consultas");
    let listaConsultas = dados ? JSON.parse(dados) : [];

    // Se estiver editando, encontra o índice e atualiza a consulta
    const index = listaConsultas.findIndex(item => item.id === consulta.id);
    if (index >= 0) {
      listaConsultas[index] = consulta;
    } else {
      listaConsultas.push(consulta);
    }

    // Salva no AsyncStorage
    await AsyncStorage.setItem("consultas", JSON.stringify(listaConsultas));
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#f1f1f1" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
    >
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#6200ee" }}>
          Registrar Consulta
        </Text>

        <Card style={{ padding: 16, borderRadius: 12, marginBottom: 24, backgroundColor: "#fff" }}>
          {/* Nome do aluno */}
          <TextInput
            label="Aluno"  // Alterado de "Médico" para "Aluno"
            value={consulta.aluno} // Alterado de 'medico' para 'aluno'
            onChangeText={(text) => setConsulta({ ...consulta, aluno: text })} // Alterado de 'medico' para 'aluno'
            mode="outlined"
            style={{ marginBottom: 16 }}
          />

          {/* Data */}
          <TextInputMask
            type={"datetime"}
            options={{ format: "DD/MM/YYYY" }}
            value={consulta.data}
            onChangeText={(text) => setConsulta({ ...consulta, data: text })}
            placeholder="Data da consulta"
            mode="outlined"
            style={{ marginBottom: 16 }}
          />

          {/* Hora */}
          <TextInputMask
            type={"custom"}
            options={{ mask: "99:99" }}
            value={consulta.hora}
            onChangeText={(text) => setConsulta({ ...consulta, hora: text })}
            placeholder="Hora da consulta"
            mode="outlined"
            style={{ marginBottom: 16 }}
          />

          {/* Local */}
          <TextInput
            label="Local"
            value={consulta.local}
            onChangeText={(text) => setConsulta({ ...consulta, local: text })}
            mode="outlined"
            style={{ marginBottom: 16 }}
          />

          {/* Descrição */}
          <TextInput
            label="Descrição"
            value={consulta.descricao}
            onChangeText={(text) => setConsulta({ ...consulta, descricao: text })}
            mode="outlined"
            multiline
            style={{ marginBottom: 16 }}
          />
        </Card>

        {errors.message && <Text style={{ color: "red", textAlign: "center" }}>{errors.message}</Text>}

        <Button
          mode="contained"
          onPress={salvarConsulta}
          style={{
            borderRadius: 8,
            paddingVertical: 10,
            backgroundColor: "#6200ee",
          }}
          labelStyle={{ fontSize: 16 }}
        >
          Salvar Consulta
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
