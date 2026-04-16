import AsyncStorage from "@react-native-async-storage/async-storage";
import { LowerText, NormalText, SaldoBox, SaldoView } from "./styles";
import React, { useEffect, useState, useMemo } from "react"; // Adicionado useMemo
import { api } from "../../api/backApi";

export default function SaldoHome({ dataRef, dateNow }) {
  const [old, setOld] = useState(0);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);

  // SEGURANÇA: Se dataRef for undefined, para a execução aqui
  if (!dataRef || !dateNow) return null;

  // useMemo evita refazer esse cálculo matemático todo render
  const mesmoMesAno = useMemo(() => {
    return dataRef.getFullYear() === dateNow.getFullYear() &&
           dataRef.getMonth() === dateNow.getMonth();
  }, [dataRef, dateNow]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (!storedToken) return;

        const headers = { Authorization: `Bearer ${storedToken}` };

        // --- AJUSTE DE LOGICA DE DATAS ---
        
        // 1. Saldo Inicial: Tudo o que aconteceu até o último segundo do MÊS ANTERIOR
        const ultimoDiaMesAnterior = new Date(dataRef.getFullYear(), dataRef.getMonth(), 0, 23, 59, 59);
        const isoSaldoInicial = ultimoDiaMesAnterior.toISOString();

        // 2. Saldo Previsto: Tudo o que aconteceu até o último segundo do MÊS ATUAL selecionado
        const ultimoDiaMesAtual = new Date(dataRef.getFullYear(), dataRef.getMonth() + 1, 0, 23, 59, 59);
        const isoSaldoPrevisto = ultimoDiaMesAtual.toISOString();

        const [oldRes, currentRes, prevRes] = await Promise.all([
          // Busca o acumulado até o fim do mês anterior (Saldo Inicial do mês)
          api.get(`/operation/allValues?endDate=${isoSaldoInicial}`, { headers }),
          
          // Busca o saldo real de HOJE (Independente do mês selecionado)
          api.get(`/operation/allValues`, { headers }),
          
          // Busca o acumulado até o fim do mês selecionado (Previsto)
          api.get(`/operation/allValues?endDate=${isoSaldoPrevisto}`, { headers }),
        ]);

        setOld(oldRes.data.value || 0);
        setPrev(prevRes.data.value || 0);
        
        // Se estivermos vendo o mês atual, mostramos o saldo real de hoje
        // Se estivermos vendo um mês passado/futuro, o saldo "atual" é o que sobrou naquele mês (prev)
        setCurrent(mesmoMesAno ? (currentRes.data.value || 0) : (prevRes.data.value || 0));

      } catch (error) {
        console.error("Erro no SaldoHome:", error);
      }
    };

    loadData();
  }, [dataRef, mesmoMesAno]);

  // Função auxiliar para formatar moeda (deixa o JSX mais limpo)
  const formatCurrency = (value) => {
    const num = Number(value) || 0;
    const formatted = Math.abs(num).toFixed(2).replace('.', ',');
    return num < 0 ? `- R$ ${formatted}` : `R$ ${formatted}`;
  };

  return (
    <SaldoView>
      <SaldoBox>
        <LowerText>Inicial</LowerText>
        <LowerText>{formatCurrency(old)}</LowerText>
      </SaldoBox>
      <SaldoBox>
        <LowerText>Saldo</LowerText>
        <NormalText>{formatCurrency(current)}</NormalText>
      </SaldoBox>
      <SaldoBox>
        <LowerText>Previsto</LowerText>
        <LowerText>{formatCurrency(prev)}</LowerText>
      </SaldoBox>
    </SaldoView>
  );
}