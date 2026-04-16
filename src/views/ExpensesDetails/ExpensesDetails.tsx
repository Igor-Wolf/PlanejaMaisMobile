import { Alert } from "react-native";
import {
  ButtonDelete,
  ButtonGeneral,
  CategoryContainer,
  CategoryContainerExternal,
  ExternalContainer,
  LowerText,
  NormalText,
  TitleBox,
  TitleText,
} from "./Styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { deleteExpenseService } from "./actions";
import { useState } from "react";

export default function ExpenseDetails({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const [dataRef, setDataRef] = useState(new Date (item.date))

  const handlePressEdit = () => {
    navigation.navigate("EditarLancamento", { item });
  };
  const handlePressDelete = async () => {
    try {
      const response = await deleteExpenseService(item._id);
      if (response.status === 200) {
        Alert.alert("Sucesso", "Lançamento deletado com sucesso!");
        navigation.navigate("Home");
      }
    } catch {
      Alert.alert("Erro ");
    }
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
        <TitleText>Detalhes</TitleText>
        <ButtonDelete onPress={handlePressDelete}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </ButtonDelete>
      </TitleBox>
      <NormalText>Descrição:</NormalText>
      <LowerText>{item.description}</LowerText>
      <NormalText>Categoria:</NormalText>
      <CategoryContainerExternal
      onPress={
          
        () => {
          navigation.navigate("LancamentosMensaisPorCategoria", {
            dataRef,
            item: { type: item.value >= 0 ? "+" : "-" },
            category: {value: item.category}
          });
        }
        }>
        <CategoryContainer>
          <NormalText style={{ color: "white" }}>{item.category}</NormalText>
        </CategoryContainer>
      </CategoryContainerExternal>
      <NormalText>Valor:</NormalText>
      {item.value > 0 ? (
        <NormalText style={{ color: "green" }}>
          R$ {item.value.toFixed(2)}
        </NormalText>
      ) : (
        <NormalText style={{ color: "red" }}>
          - R$ {Math.abs(item.value).toFixed(2)}
        </NormalText>
      )}
      <NormalText>Data do Lançamento:</NormalText>
      <LowerText>
        {new Date(item.date).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </LowerText>
      <NormalText>Última Alteração:</NormalText>
      <LowerText>
        {new Date(item.updatedAt).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </LowerText>
      <ButtonGeneral
        onPress={handlePressEdit}
        style={{ backgroundColor: "#066e74" }}
      >
        <NormalText>Editar</NormalText>
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
