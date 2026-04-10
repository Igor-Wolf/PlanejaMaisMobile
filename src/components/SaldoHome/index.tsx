import AsyncStorage from "@react-native-async-storage/async-storage";
import { LowerText, NormalText, SaldoBox, SaldoView } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../api/backApi";

export default function SaldoHome({ dataRef, dateNow }) {
  const [old, setOld] = useState(0); // Inicie com 0 ou null
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);

  const data1 = dataRef;
  const data2 = dateNow;

  const mesmoMesAno =
    data1.getFullYear() === data2.getFullYear() &&
    data1.getMonth() === data2.getMonth();

  const pegarUltimoMomentoDoMes = (dataRef) => {
    const ano = dataRef.getFullYear();
    const mes = dataRef.getMonth();

    // mes + 1 = próximo mês
    // dia 0 = último dia do mês anterior (o mês de dataRef)
    const ultimoDia = new Date(ano, mes + 1, 0, 23, 59, 59, 999);

    return ultimoDia.toISOString();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (!storedToken) return;

        // Convertendo as datas para ISO string antes de enviar
        const isoDataRef = dataRef.toISOString();

        const headers = { Authorization: `Bearer ${storedToken}` };

        // Fazendo as requisições em paralelo
        const [authRes, oldRes, currentRes, prevRes] = await Promise.all([
          api.get("/login/protected", { headers }),
          api.get(`/operation/allValues?endDate=${isoDataRef}`, { headers }),
          api.get(`/operation/allValues`, { headers }),
          api.get(
            `/operation/allValues?endDate=${pegarUltimoMomentoDoMes(dataRef)}`,
            { headers },
          ),
        ]);

        if (authRes.status === 200) {
          setOld(oldRes.data.value);
          setPrev(prevRes.data.value);

          if (mesmoMesAno) {
            setCurrent(currentRes.data.value);
          } else {
            setCurrent(prevRes.data.value);
          }
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    loadData();
  }, [dataRef]); // <--- OBRIGATÓRIO ser um Array [dataRef]

  return (
    <SaldoView>
      <SaldoBox>
        <LowerText>Inicial</LowerText>
        {old < 0 ? (
          <LowerText>- R$ {Math.abs(old).toFixed(2)}</LowerText>
        ) : (
          <LowerText>R$ {old}</LowerText>
        )}
      </SaldoBox>
      <SaldoBox>
        <LowerText>Saldo</LowerText>
        {current < 0 ? (
          <NormalText>- R$ {Math.abs(current).toFixed(2)}</NormalText>
        ) : (
          <NormalText>R$ {current}</NormalText>
        )}
      </SaldoBox>
      <SaldoBox>
        <LowerText>Previsto</LowerText>
        {prev < 0 ? (
          <LowerText>- R$ {Math.abs(prev).toFixed(2)}</LowerText>
        ) : (
          <LowerText>R$ {prev}</LowerText>
        )}
      </SaldoBox>
    </SaldoView>
  );
}
