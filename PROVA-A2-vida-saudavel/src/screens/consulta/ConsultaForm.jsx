import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, TextInput, Button, Card, useTheme, HelperText } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ConsultaForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();

  const [consulta, setConsulta] = useState({
    id: Date.now(),
    aluno: "",
    data: "",
    hora: "",
    local: "",
    descricao: "",
  });

  const [errors, setErrors] = useState({});
  const consultaEditando = route.params?.dados;
  useEffect(() => {
    if (consultaEditando.id) {
      setConsulta(route.params.dados);
    }
  }, [consultaEditando]);

  const validate = () => {
    const newErrors = {};
    if (!consulta.aluno) newErrors.aluno = "Aluno é obrigatório";
    if (!consulta.data) newErrors.data = "Data é obrigatória";
    if (!consulta.hora) newErrors.hora = "Hora é obrigatória";
    if (!consulta.local) newErrors.local = "Local é obrigatório";
    if (!consulta.descricao) newErrors.descricao = "Descrição é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const salvarConsulta = async () => {
    if (!validate()) return;

    const dados = await AsyncStorage.getItem("consultas");
    let listaConsultas = dados ? JSON.parse(dados) : [];

    const index = listaConsultas.findIndex(item => item.id === consulta.id);
    if (index >= 0) {
      listaConsultas[index] = consulta;
    } else {
      listaConsultas.push(consulta);
    }

    await AsyncStorage.setItem("consultas", JSON.stringify(listaConsultas));
    navigation.goBack();
  };

  const inputStyle = {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 8,
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#f1f1f1" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
    >
      <View style={{ padding: 20, flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16, color: colors.primary }}>
          {route.params?.dados ? "Editar Consulta" : "Registrar Consulta"}
        </Text>

        <Card style={{ padding: 16, borderRadius: 12, marginBottom: 24 }}>
          {/* Aluno */}
          <TextInput
            label="Aluno"
            value={consulta.aluno}
            onChangeText={(text) => setConsulta({ ...consulta, aluno: text })}
            error={!!errors.aluno}
            mode="outlined"
            style={inputStyle}
          />
          <HelperText type="error" visible={!!errors.aluno}>{errors.aluno}</HelperText>

          {/* Data */}
          <TextInputMask
            type={"datetime"}
            options={{ format: "DD/MM/YYYY" }}
            value={consulta.data}
            onChangeText={(text) => setConsulta({ ...consulta, data: text })}
            placeholder="Data da consulta"
            style={inputStyle}
            customTextInput={TextInput}
            customTextInputProps={{
              label: "Data",
              mode: "outlined",
              error: !!errors.data,
            }}
          />
          <HelperText type="error" visible={!!errors.data}>{errors.data}</HelperText>

          {/* Hora */}
          <TextInputMask
            type={"custom"}
            options={{ mask: "99:99" }}
            value={consulta.hora}
            onChangeText={(text) => setConsulta({ ...consulta, hora: text })}
            placeholder="Hora da consulta"
            style={inputStyle}
            keyboardType="numeric"
            customTextInput={TextInput}
            customTextInputProps={{
              label: "Hora",
              mode: "outlined",
              error: !!errors.hora,
            }}
          />
          <HelperText type="error" visible={!!errors.hora}>{errors.hora}</HelperText>

          {/* Local */}
          <TextInput
            label="Local"
            value={consulta.local}
            onChangeText={(text) => setConsulta({ ...consulta, local: text })}
            error={!!errors.local}
            mode="outlined"
            style={inputStyle}
          />
          <HelperText type="error" visible={!!errors.local}>{errors.local}</HelperText>

          {/* Descrição */}
          <TextInput
            label="Descrição"
            value={consulta.descricao}
            onChangeText={(text) => setConsulta({ ...consulta, descricao: text })}
            error={!!errors.descricao}
            mode="outlined"
            multiline
            style={inputStyle}
          />
          <HelperText type="error" visible={!!errors.descricao}>{errors.descricao}</HelperText>
        </Card>

        <Button
          mode="contained"
          onPress={salvarConsulta}
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
            marginTop: 5
          }}
          labelStyle={{ fontSize: 16 }}
        >
          Voltar
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}