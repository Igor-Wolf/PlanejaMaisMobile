import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, RefreshControl, Text, View } from "react-native";
import {
  Create,
  DateButton,
  DateView,
  NormalText,
  SclrollContainer,
} from "./Styles";
import SaldoHome from "../../components/SaldoHome";
import VisaoGeral from "../../components/VisaoGeral";
import UltimosLancamentos from "../../components/UltimosLancamentos";

import Ionicons from "@expo/vector-icons/Ionicons";
import ActionMenu from "../../components/ActionMenu";
import EconomiaMensal from "../../components/EconomiaMensal";
import DespesasPorCategoria from "../../components/DespesasPorCategoria";
import ReceitasPorCategoria from "../../components/ReceitasPorCategoria";
import { api } from "../../api/backApi";
import CurrentGoals from "../../components/CurrentGoal";

export default function Home() {
  const navigation = useNavigation();

  const [token, setToken] = useState("");
  const [dataRef, setDataRef] = useState(new Date());
  const [dateNow, setDateNow] = useState(new Date());
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken !== null) {
          setToken(storedToken);

          const headers = { Authorization: `Bearer ${storedToken}` };
          // Fazendo as requisições em paralelo
          const authRes = await api.get("/login/protected", { headers });

          if (authRes.status !== 200) {
            setRefreshing(false);
            navigation.reset({
              index: 0,
              routes: [{ name: "LoginPage" }],
            });
          }
          setRefreshing(false);
        }
      } catch (error) {
        setRefreshing(false);
        console.error("Erro ao carregar o token:", error);
      }
    };

    loadToken();
  }, [dataRef, refreshing]); // O array vazio garante que isso rode apenas UMA vez ao abrir a tela

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Atenção!", "Deseja realmente sair do aplicativo?", [
          { text: "Não", onPress: () => null, style: "cancel" },
          { text: "Sim", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      // 1. Criamos a assinatura (subscription)
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      // 2. No cleanup, chamamos o método .remove() da assinatura
      return () => subscription.remove();
    }, []),
  );

  const hoje = new Date();

  const mudarMes = (direcao: number) => {
    setDataRef((prevData) => {
      // Criamos uma nova data baseada no ano e mês da anterior
      return new Date(prevData.getFullYear(), prevData.getMonth() + direcao, 1);
    });
  };

  // Função para formatar o texto dinamicamente
  const formatarLabel = () => {
    const mesNome = dataRef.toLocaleString("pt-BR", { month: "long" });
    const anoRef = dataRef.getFullYear();
    const anoAtual = hoje.getFullYear();

    // Se o ano da data selecionada for diferente do ano atual, mostra o ano
    if (anoRef !== anoAtual) {
      return `${mesNome} / ${anoRef}`;
    }

    // Se for o ano atual, mostra apenas o mês
    return mesNome;
  };

  const handleRefresh = () => {
    setRefreshing(true);

    // Simulação de fetch
  };

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <Create onPress={() => setMenuVisible(true)}>
        <Ionicons name="add-circle-outline" size={35} color="white" />
      </Create>
      <DateView>
        <DateButton onPress={() => mudarMes(-1)}>
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </DateButton>
        <NormalText>{formatarLabel()}</NormalText>
        <DateButton onPress={() => mudarMes(1)}>
          <Ionicons name="chevron-forward-outline" size={24} color="white" />
        </DateButton>
      </DateView>
      <SclrollContainer
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#6200ee"
            colors={["#6200ee", "#03dac6"]}
          />
        }
      >
        {!refreshing && (
          <>
            <SaldoHome dataRef={dataRef} dateNow={dateNow}></SaldoHome>
            <VisaoGeral dataRef={dataRef}></VisaoGeral>
            <CurrentGoals dataRef={dataRef}></CurrentGoals>
            <EconomiaMensal dataRef={dataRef}></EconomiaMensal>
            <UltimosLancamentos dataref={dataRef}></UltimosLancamentos>
            <DespesasPorCategoria dataRef={dataRef}></DespesasPorCategoria>
            <ReceitasPorCategoria dataRef={dataRef}></ReceitasPorCategoria>
          </>
        )}
        <ActionMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
        />
      </SclrollContainer>

      <Text>{token}</Text>
    </View>
  );
}
