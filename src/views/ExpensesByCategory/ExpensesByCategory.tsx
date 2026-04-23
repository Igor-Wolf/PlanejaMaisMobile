import { useNavigation } from "@react-navigation/native";
import {
  ButtonGeneral,
  ExternalContainer,
  NormalText,
  TitleText,
} from "./Styles";
import UltimosLancamentos from "../../components/UltimosLancamentos";
import UltimasReceitas from "../../components/UltimasReceitas";
import { Text } from "react-native";
import { useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import UltimasDespesas from "../../components/UltimasDespesas";
import UltimasMovimentacoes from "../../components/UltimasMovimentacoes";

export default function ExpensesByCategory({ route }) {
  const { category } = route.params;
  const navigation = useNavigation();

  const [categoryChoosed, setCategoryChosed] = useState(category.value);

  useEffect(() => {
    setCategoryChosed(category.value);
  }, [category.value]);

  return (
    <ExternalContainer
      contentContainerStyle={{
        paddingTop: 5,
        paddingBottom: 50,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <TitleText>Categoria {categoryChoosed}</TitleText>

      <UltimasMovimentacoes category={categoryChoosed}></UltimasMovimentacoes>

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
