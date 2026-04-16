import React, { useState } from "react";
import { Platform, TouchableOpacity, Alert } from "react-native";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import * as yup from "yup"; // Importação mantida como 'yup'
import { createExpenseService, editExpenseService } from "./actions";

export default function ExpenseCreate({ route }) {
  const { item } = route.params || {};
  const navigation = useNavigation();

  // Estados dos inputs
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [valueExpense, setValueExpense] = useState("");
  const [date, setDate] = useState(new Date());

  const [showPicker, setShowPicker] = useState(false);
  const [type, setType] = useState(item.type === "+" ? "Entrada" : "Despesa");

  const data = [
    { label: "Entrada", value: "Entrada" },
    { label: "Despesa", value: "Despesa" },
  ];

  // Schema de Validação
  const expenseSchema = yup.object({
    description: yup.string().required("Descrição é obrigatória"),
    category: yup.string().required("Categoria é obrigatória"),
    value: yup
      .number()
      .transform((_value, originalValue) => {
        // Converte vírgula para ponto e transforma em número
        return Number(String(originalValue).replace(",", "."));
      })
      .typeError("Deve ser um valor válido")
      .positive("O valor deve ser maior que zero")
      .required("Campo obrigatório"),
    date: yup
      .date()
      .typeError("Data inválida")
      .required("A data é obrigatória"),
  });

  // Função para validar e salvar
  const handleSave = async () => {
    try {
      const formData = {
        description,
        category,
        value: valueExpense,
        date,
      };

      // Valida os dados contra o schema
      await expenseSchema.validate(formData, { abortEarly: true });

      // Se validado, prepara o objeto final (ajustando o sinal pelo tipo)
      const numericValue = Number(valueExpense.replace(",", "."));
      const finalValue =
        type === "Despesa" ? -Math.abs(numericValue) : Math.abs(numericValue);

      const updatedExpense = {
        description,
        category,
        value: finalValue,
        date: date.toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        const response = await createExpenseService(updatedExpense);

        if (response.status === 201) {
          Alert.alert("Sucesso", "Lançamento criado com sucesso!");
          navigation.navigate("Home");
        }
      } catch {}

      // Aqui você chamaria sua função de API ou Contexto para salvar
    } catch (error) {
      // Exibe o primeiro erro de validação encontrado
      Alert.alert("Erro de Validação", error.message);
    }
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
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
        <TitleText>Criar {item.type === "+" ? "Entrada" : "Despesa"}</TitleText>
      </TitleBox>

      <NormalText>Descrição:</NormalText>
      <InputText
        value={description}
        onChangeText={setDescription}
        placeholder="Digite a descrição"
        placeholderTextColor="black"
      />

      <NormalText>Categoria:</NormalText>
      <InputText
        value={category}
        onChangeText={setCategory}
        placeholder="Digite a categoria"
        placeholderTextColor="black"
      />

      <NormalText>Valor:</NormalText>
      <InputText
        value={valueExpense}
        onChangeText={setValueExpense}
        placeholder="Digite o valor"
        keyboardType="numeric"
        placeholderTextColor="black"
      />

      <NormalText>Data do Lançamento:</NormalText>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <InputText
          value={formatDate(date)}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onChange}
        />
      )}

      {/* Botão Salvar agora chama a função handleSave */}
      <ButtonGeneral
        onPress={handleSave}
        style={{ backgroundColor: "#066e74" }}
      >
        <NormalText>Salvar</NormalText>
        <Ionicons name="create-sharp" size={24} color="white" />
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
