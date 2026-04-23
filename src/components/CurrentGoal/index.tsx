import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../api/backApi";
import ProgressBar from "../ProgressBar";
import { useNavigation } from "@react-navigation/native";
import ActionCardMenuMeta from "../ActionCardMenuMeta";
import { ActivityIndicator, View } from "react-native";

// Importação dos seus Styled Components
import {
  BoxGoals,
  CardContainer,
  LancamentosBoxLeft,
  LancamentosBoxRight,
  LowerText,
  NormalText,
  NormalTextCategory,
} from "./Styles";

export default function CurrentGoals({ dataRef }) {
  const navigation = useNavigation();

  const [goals, setGoals] = useState([]);
  const [lancamentos, setLancamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [itemToSend, setItemToSend] = useState(null);
  const [valueToSend, setvalueToSend] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (!dataRef) return;

      setLoading(true);
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (!storedToken) return;

        // Tratamento da data recebida via prop
        const date = new Date(dataRef);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;

        const headers = { Authorization: `Bearer ${storedToken}` };

        // Chamadas paralelas para otimizar o tempo de resposta
        const [authRes, goalsRes, lancamentosRes] = await Promise.all([
          api.get("/login/protected", { headers }),
          api.get(`/goal/myGoal?year=${year}&month=${month}`, { headers }),
          api.get(`/expense/myExpenseByFilter`, { headers }),
        ]);

        if (authRes.status === 200) {
          setGoals(goalsRes.data || []);
          setLancamentos(lancamentosRes.data || []);
        }
      } catch (error) {
        console.error("Erro na requisição das metas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataRef]);

  // Função para somar os lançamentos vinculados à meta específica
  const calcularSomaProgresso = (goalYear, goalMonth) => {
    if (!lancamentos || lancamentos.length === 0) return 0;

    // A chave deve bater exatamente com o que está no campo 'category' do seu gasto
    const chaveCategoria = `@goal:${goalYear}-${goalMonth}`;

    return lancamentos
      .filter((item) => item.category === chaveCategoria)
      .reduce((acumulador, atual) => acumulador + (atual.value || 0), 0);
  };

  const handlePress = (item, valorAtual) => {
    navigation.navigate("Metas", {
    screen: "DetalhesMetas",
    params: { item, valorAtual },
  });
  };

  const openMenu = (event, item, valorAtual) => {
    const { pageX, pageY } = event.nativeEvent;
    setItemToSend(item);
    setvalueToSend(valorAtual);
    setMenuPosition({ x: pageX, y: pageY });
    setMenuVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <ActionCardMenuMeta
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        position={menuPosition}
        item={itemToSend}
        valorAtual={valueToSend}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#54DBEA"
          style={{ marginTop: 50 }}
        />
      ) : (
        <>
          {goals.length > 0 ? (
            goals.map((item) => {
              const valorAtual = Math.abs(
                calcularSomaProgresso(item.year, item.month),
              );
              const valorMeta = Math.abs(item.goal || 0);

              return (
                <CardContainer
                  key={item._id || Math.random().toString()}
                  onPress={() => handlePress(item, valorAtual)}
                  
                >
                  <View style={{ alignSelf: "flex-start", padding: 10 }}>
                    <NormalText>Meta Referente</NormalText>
                  </View>
                  <BoxGoals>
                    <LancamentosBoxLeft>
                      <NormalText
                        numberOfLines={1}
                        style={{ fontWeight: "700" }}
                      >
                        {item.title}
                      </NormalText>
                      <LowerText>Ano: {item.year}</LowerText>
                      <LowerText>
                        Mês: {item.month === 0 ? "Geral/Anual" : item.month}
                      </LowerText>
                    </LancamentosBoxLeft>

                    <LancamentosBoxRight>
                      <NormalTextCategory
                        style={{
                          backgroundColor:
                            item.month === 0 ? "#007aff" : "#28a745",
                        }}
                      >
                        {item.month === 0 ? "Anual" : "Mensal"}
                      </NormalTextCategory>

                      <NormalText style={{ fontWeight: "bold" }}>
                        R$ {valorMeta.toFixed(2)}
                      </NormalText>

                      <LowerText>
                        {new Date(item.updatedAt).toLocaleDateString("pt-BR")}
                      </LowerText>
                    </LancamentosBoxRight>
                  </BoxGoals>
                  <ProgressBar atual={valorAtual} total={valorMeta} />
                  <NormalText
                    style={{ fontSize: 13, marginTop: 6, textAlign: "right" }}
                  >
                    {`R$ ${valorAtual.toFixed(2)} / R$ ${valorMeta.toFixed(2)}`}
                  </NormalText>
                </CardContainer>
              );
            })
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
}
