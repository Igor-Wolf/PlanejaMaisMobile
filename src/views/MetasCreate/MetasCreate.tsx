import React, { useState } from "react";
import { Platform, TouchableOpacity, Alert, Text } from "react-native";
import {
  ButtonGeneral,
  ExternalContainer,
  InputText,
  NormalText,
  StyledDropdown,
  TitleBox,
  TitleText,
} from "./Styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup"; // Importação mantida como 'yup'
import Stepper from "../../components/Stepper";
import { createGoalService, editGoalService } from "./actions";

export default function MetasCreate() {
  
  const navigation = useNavigation();

  // Estados dos inputs
  const [description, setDescription] = useState();
  const [year, setYear] = useState(new Date().getFullYear());
  const [valueGoal, setValueGoal] = useState();
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const data = [
    { label: "Anual", value: 0 },
    { label: "Janeiro", value: 1 },
    { label: "Fevereiro", value: 2 },
    { label: "Março", value: 3 },
    { label: "Abril", value: 4 },
    { label: "Maio", value: 5 },
    { label: "Junho", value: 6 },
    { label: "Julho", value: 7 },
    { label: "Agosto", value: 8 },
    { label: "Setembro", value: 9 },
    { label: "Outubro", value: 10 },
    { label: "Novembro", value: 11 },
    { label: "Dezembro", value: 12 },
  ];

  // Schema de Validação
  const goalSchema = yup.object({
    title: yup.string().required("Descrição é obrigatória"),

    month: yup
      .number()
      .integer("O valor deve ser um número inteiro")
      .min(0, "Deve ser maior ou igual a zero")
      .required("Campo Obrigatório"),
    year: yup
      .number()
      .integer("O valor deve ser um número inteiro")
      .positive("O valor deve ser positivo")
      .required("Campo Obrigatório"),
    goal: yup
      .number()
      .typeError("Deve ser um valor valido")
      .required("Campo Obrigatório"),

    updatedAt: yup
      .string()
      .matches(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
        "Data deve estar no formato ISO 8601",
      )
      .required("A data é obrigatória"),
  });

  // Função para validar e salvar
  const handleSave = async () => {
    try {
      const formData = {
        title: description,
        month,
        year,
        goal: valueGoal,
        updatedAt: new Date().toISOString(),
      };
      // Valida os dados contra o schema
      await goalSchema.validate(formData, { abortEarly: true });
      // Se validado, prepara o objeto final (ajustando o sinal pelo tipo)
      const numericValue = Number(valueGoal.replace(",", "."));
      const finalValue = Math.abs(numericValue).toFixed(2);

      const updatedGoal = {
        title: description,
        month,
        year,
        goal: Number(finalValue),
        updatedAt: new Date().toISOString(),
      };
      console.log(formData);

      try {
        const response = await createGoalService(updatedGoal);
        if (response.status === 201) {
          Alert.alert("Sucesso", "Meta criada com sucesso!");
          navigation.navigate("MinhasMetas");
        } else if (response.status === 409) {
          Alert.alert("Erro de duplicidade", "Meta já criada no banco. Utilizar o editar");
        }
      } catch {}
    } catch (error) {
      // Exibe o primeiro erro de validação encontrado
      Alert.alert("Erro de Validação", error.message);
    }
  };

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <ExternalContainer
      contentContainerStyle={{
        gap: 15,
        paddingTop: 5,
        paddingBottom: 50,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <TitleBox>
        <TitleText>Criar</TitleText>
      </TitleBox>

      <NormalText>Descrição:</NormalText>
      <InputText
        value={description}
        onChangeText={setDescription}
        placeholder="Digite a descrição"
        placeholderTextColor="black"
      />

      <NormalText>Valor:</NormalText>
      <InputText
        value={valueGoal}
        onChangeText={setValueGoal}
        placeholder="Digite o valor"
        keyboardType="numeric"
        placeholderTextColor="black"
      />

      <NormalText>Ano:</NormalText>
      <Stepper
        value={year}
        onUpdate={(newValue) => setYear(newValue)}
        min={2000}
        max={2100}
      ></Stepper>

      <NormalText>Mês:</NormalText>
      <StyledDropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Selecione o Mês"
        value={month}
        onChange={(item) => setMonth(item.value)}
      />

      {/* Botão Salvar agora chama a função handleSave */}
      <ButtonGeneral
        onPress={handleSave}
        style={{ backgroundColor: "#066e74" }}
      >
        <NormalText style={{ color: "white" }}>Salvar Alterações</NormalText>
        <Ionicons name="save-outline" size={24} color="white" />
      </ButtonGeneral>

      <ButtonGeneral
        onPress={() => navigation.goBack()}
        style={{ backgroundColor: "red" }}
      >
        <NormalText>Voltar</NormalText>
        <Ionicons name="arrow-undo-sharp" size={24} color="white" />
      </ButtonGeneral>
    </ExternalContainer>
  );
}
