import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { api } from "../../api/backApi";
import ProgressBar from "../ProgressBar";

// Importação dos seus Styled Components
import {
  BoxGoals,
  CardContainer,
  LancamentosBoxLeft,
  LancamentosBoxRight,
  LowerText,
  NormalText,
  NormalTextCategory,
  SelectedOrderBox,
  StyledPicker,
  TopBox,
} from "./Styles";
import { useNavigation } from "@react-navigation/native";
import ActionCardMenuMeta from "../ActionCardMenuMeta";

export default function Goals({ refreshing, setRefreshing }) {
  const navigation = useNavigation();

  const [goals, setGoals] = useState([]);
  const [lancamentos, setLancamentos] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("Todas");


  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [itemToSend, setItemToSend] = useState();
  const [valueToSend, setvalueToSend] = useState();

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (!storedToken) {
          setRefreshing(false);
          return;
        }

        const headers = { Authorization: `Bearer ${storedToken}` };

        // Chamadas paralelas para otimizar o tempo de resposta
        const [authRes, goalsRes, lancamentosRes] = await Promise.all([
          api.get("/login/protected", { headers }),
          api.get(`/goal/myGoal`, { headers }),
          api.get(`/expense/myExpenseByFilter`, { headers }),
        ]);

        if (authRes.status === 200) {
          setGoals(goalsRes.data || []);
          setLancamentos(lancamentosRes.data || []);
        }
      } catch (error) {
        console.error("Erro na requisição das metas:", error);
      } finally {
        // Para o ícone de Refresh no componente pai
        setRefreshing(false);
      }
    };

    // Só busca os dados se o refreshing for disparado (inicialmente ou via swipe)
    if (refreshing) {
      loadData();
    }
  }, [refreshing]);

  // Função para somar os lançamentos vinculados à meta específica
  const calcularSomaProgresso = (year, month) => {
    if (!lancamentos || lancamentos.length === 0) return 0;

    const chaveCategoria = `@goal:${year}-${month}`;

    return lancamentos
      .filter((item) => item.category === chaveCategoria)
      .reduce((acumulador, atual) => acumulador + (atual.value || 0), 0);
  };

  // --- LÓGICA DE FILTRAGEM ---
  const goalsFiltrados = goals.filter((item) => {
    if (selectedOrder === "Todas") return true;
    if (selectedOrder === "Anual") return item.month === 0;
    if (selectedOrder === "Mensal") return item.month !== 0;
    return true;
  });

  const handlePress = (item, valorAtual) => {
    navigation.navigate("DetalhesMetas", { item, valorAtual });
  };

  const openMenu = (event, item, valorAtual) => {
    const { pageX, pageY } = event.nativeEvent;
    setItemToSend(item)
    setvalueToSend(valorAtual)
    setMenuPosition({ x: pageX, y: pageY });
    setMenuVisible(true);
  };
  return (
    <>
      {/* Só renderizamos o conteúdo se não estiver carregando, para evitar "pulo" de layout */}
      {!refreshing && (
        <>
          <ActionCardMenuMeta 
            visible={menuVisible} 
            onClose={() => setMenuVisible(false)} 
                  position={menuPosition}
            item={itemToSend}
            valorAtual={valueToSend}
          />
          <TopBox>
            <NormalText
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5 }}
            >
              {""}
            </NormalText>
            <SelectedOrderBox>
              <NormalText>{selectedOrder}</NormalText>
              {/* Seletor de Categoria */}
              <StyledPicker
                selectedValue={selectedOrder}
                onValueChange={(value) => setSelectedOrder(value)}
                mode="dropdown"
                dropdownIconColor="#066e74"
              >
                <Picker.Item label="Todas" value="Todas" />
                <Picker.Item label="Anuais" value="Anual" />
                <Picker.Item label="Mensais" value="Mensal" />
              </StyledPicker>
            </SelectedOrderBox>
          </TopBox>

          {goalsFiltrados.length > 0 ? (
            goalsFiltrados.map((item) => {
              // Cálculos de valor para usar na barra e no texto
              const valorAtual = Math.abs(
                calcularSomaProgresso(item.year, item.month),
              );
              const valorMeta = Math.abs(item.goal || 0);

              return (
                <CardContainer key={item._id} onPress={() => handlePress(item, valorAtual)} onLongPress={(e) => openMenu(e, item, valorAtual)}>
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
                      {/* 0 = Anual (Azul) | Diferente de 0 = Mensal (Verde) */}
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
            <NormalText
              style={{ textAlign: "center", marginTop: 40, color: "#666" }}
            >
              Nenhuma meta{" "}
              {selectedOrder !== "Todas" ? selectedOrder.toLowerCase() : ""}{" "}
              encontrada.
            </NormalText>
          )}
        </>
      )}
    </>
  );
}
