import { Alert } from "react-native";
import {
  ButtonCash,
  ButtonDelete,
  ButtonGeneral,
  CategoryContainer,
  CategoryContainerExternal,
  ExternalContainer,
  LowerText,
  NormalText,
  TitleBox,
  TitleButtonContainer,
  TitleText,
} from "./Styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
// import { deleteExpenseService } from "./actions";
import { useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import { deleteMetaService } from "./actions";
import ActionTransactionMenu from "../../components/ActionTransactionMenu";

export default function MetasDetails({ route }) {
  const { item, valorAtual } = route.params;
  const navigation = useNavigation();

  const [menuVisible, setMenuVisible] = useState(false);

  const getMonthName = (monthNumber) => {
    if (monthNumber === 0) {
      return `0 (Anual)`;
    }
    // Criamos uma data: Ano 2000, mês (n-1), dia 1.
    const date = new Date(2000, monthNumber - 1, 1);

    return date.toLocaleString("pt-BR", { month: "long" });
  };

  const handlePressEdit = () => {
    navigation.navigate("EditarMetas", { item });
  };
  const handlePressDelete = async () => {
    try {
      const response = await deleteMetaService(item._id);
      if (response.status === 200) {
        Alert.alert("Sucesso", "Meta deletada com sucesso!");
        navigation.navigate("MinhasMetas");
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
        <TitleButtonContainer>
          <ButtonCash onPress={() => setMenuVisible(true)}>
            <Ionicons name="wallet-outline" size={24} color="white" />
          </ButtonCash>
          <ButtonDelete onPress={handlePressDelete}>
            <Ionicons name="trash-outline" size={24} color="white" />
          </ButtonDelete>
        </TitleButtonContainer>
      </TitleBox>
      <NormalText>Descrição:</NormalText>
      <LowerText>{item.title}</LowerText>

      <NormalText>Categoria de Lançamentos:</NormalText>
      <CategoryContainerExternal
        onPress={() => {
          navigation.navigate("UltimasMovimentacoes", {
            category: { value: `@goal:${item.year}-${item.month}` },
          });
        }}
      >
        <CategoryContainer>
          <NormalText
            style={{ color: "white" }}
          >{`@goal:${item.year}-${item.month}`}</NormalText>
        </CategoryContainer>
      </CategoryContainerExternal>
      <NormalText>Meta:</NormalText>
      {item.goal > 0 ? (
        <NormalText style={{ color: "green" }}>
          R$ {item.goal.toFixed(2)}
        </NormalText>
      ) : (
        <NormalText style={{ color: "red" }}>
          - R$ {Math.abs(item.goal).toFixed(2)}
        </NormalText>
      )}
      <NormalText>Valor Investido:</NormalText>
      {valorAtual > 0 ? (
        <NormalText style={{ color: "green" }}>
          R$ {valorAtual.toFixed(2)}
        </NormalText>
      ) : (
        <NormalText style={{ color: "red" }}>
          - R$ {Math.abs(valorAtual).toFixed(2)}
        </NormalText>
      )}
      <NormalText>Ano:</NormalText>
      <LowerText>{item.year}</LowerText>
      <NormalText>Mês:</NormalText>
      <LowerText>{getMonthName(item.month)}</LowerText>
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
      <ProgressBar atual={valorAtual} total={item.goal}></ProgressBar>
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
      <ActionTransactionMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        category={`@goal:${item.year}-${item.month}`}
      />
    </ExternalContainer>
  );
}
