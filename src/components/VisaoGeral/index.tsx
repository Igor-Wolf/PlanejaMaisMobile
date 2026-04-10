import { useEffect, useState } from "react";
import { GeralBox, GeralView, NormalText } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../api/backApi";
import { useNavigation } from "@react-navigation/native";

export default function VisaoGeral({ dataRef }) {
  const navigation = useNavigation();
  const [revenue, setRevenue] = useState(0);
  const [expense, setExpense] = useState(0);
  

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (!storedToken) return;
        // Convertendo as datas para ISO string antes de enviar
        const isoDataRef = dataRef.toISOString().slice(0, 7);

        const headers = { Authorization: `Bearer ${storedToken}` };

        // Fazendo as requisições em paralelo
        const [authRes, revenueRes, expenseRes] = await Promise.all([
          api.get("/login/protected", { headers }),
          api.get(`/operation/allDateValues/${isoDataRef}?startValue=0`, {
            headers,
          }),
          api.get(`/operation/allDateValues/${isoDataRef}?endValue=0`, {
            headers,
          }),
        ]);

        if (authRes.status === 200) {
          setRevenue(revenueRes.data.value);
          setExpense(expenseRes.data.value);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    loadData();
  }, [dataRef]); // <--- OBRIGATÓRIO ser um Array [dataRef]


 const onClickPositive = () => {
    // Fecha o modal antes de navegar para evitar sobreposição visual
     
    navigation.navigate("LancamentosMensais", {dataRef, item: { type: "+" } });
  };

  const onClickNegative = () => {
    
    navigation.navigate("LancamentosMensais", {dataRef, item: { type: "-" } });
  };


  return (
    <GeralView>
      <NormalText>Visão Geral</NormalText>
      <GeralBox onPress={onClickPositive}>
        <NormalText>Receitas</NormalText>
        <NormalText style={{ color: "green" }}>R$ {revenue}</NormalText>
      </GeralBox>
      <GeralBox onPress={onClickNegative}>
        <NormalText >Despesas</NormalText>
        <NormalText style={{ color: "red" }}>- R$ {Math.abs(expense).toFixed(2)}</NormalText>
      </GeralBox>
    </GeralView>
  );

  
}
