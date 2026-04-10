import React, { useEffect, useState } from "react";
import {
  GeralBox,
  GeralView,
  GraphicContainer,
  GraphicView,
  LowerText,
  NormalText,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../api/backApi";
import { useNavigation } from "@react-navigation/native";
import { PieChart } from "react-native-gifted-charts";
import { View } from "react-native";

export default function EconomiaMensal({ dataRef }) {
  const navigation = useNavigation();
  const [revenue, setRevenue] = useState(0);
  const [expense, setExpense] = useState(0);

  const [graphColor, setGraphColor] = useState("lightgray");
  const [graphValue, setGraphValue] = useState(0);

  // Configuração dos dados do gráfico com travas de segurança
  const pieData = [
    {
      value: Math.max(0, Math.min(graphValue, 100)),
      color: graphColor,
    },
    {
      value: 100 - Math.max(0, Math.min(graphValue, 100)),
      color: "#333",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (!storedToken) return;

        const isoDataRef =
          dataRef instanceof Date
            ? dataRef.toISOString().slice(0, 7)
            : new Date().toISOString().slice(0, 7);

        const headers = { Authorization: `Bearer ${storedToken}` };

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
          // 1. Garantimos que os valores são números logo na chegada
          const rev = Number(revenueRes.data?.value || 0);
          const exp = Math.abs(Number(expenseRes.data?.value || 0));

          setRevenue(rev);
          setExpense(exp);

          // 2. Lógica de cálculo usando constantes locais (rev e exp) para evitar delay de estado
          if (rev > 0) {
            const auxi = ((rev - exp) / rev) * 100;
            const roundedValue = Math.round(auxi);

            // Se for negativo, pegamos o valor absoluto para o preenchimento do gráfico
            setGraphValue(Math.abs(roundedValue));
            setGraphColor(roundedValue >= 0 ? "green" : "red");
          } else if (rev === 0 && exp === 0) {
            setGraphValue(0);
            setGraphColor("lightgray");
          } else if (rev === 0 && exp > 0) {
            // Caso onde só há gastos e nenhuma receita
            setGraphValue(100);
            setGraphColor("red");
          }
        }
      } catch (error) {
        console.error("Erro na requisição EconomiaMensal:", error);
      }
    };

    loadData();
  }, [dataRef]);

  return (
    <GeralView>
      <NormalText style={{ marginBottom: 15 }}>Economia Mensal</NormalText>

      <GraphicContainer>
        <GraphicView>
          <PieChart
            donut
            radius={80}
            innerRadius={62}
            innerCircleColor={"#242222"}
            data={pieData}
            centerLabelComponent={() => (
              <NormalText style={{ fontSize: 22, fontWeight: "bold" }}>
                {graphColor === "red" && graphValue > 0
                  ? `-${graphValue}`
                  : graphValue}
                %
              </NormalText>
            )}
          />
          {revenue - expense >= 0 ? (
            <>
              <NormalText style={{ color: "green", marginBottom: 10 }}>
                R$ {Number(revenue - expense || 0).toFixed(2)}
              </NormalText>
              <LowerText style={{ paddingTop: 0 }}>Com economia</LowerText>
            </>
          ) : (
            <>
              <NormalText style={{ color: "red" }}>
                - R$ {Number(Math.abs(revenue - expense) || 0).toFixed(2)}
              </NormalText>
              <LowerText style={{ paddingTop: 0 }}>Sem economia</LowerText>
            </>
          )}
        </GraphicView>

        <GeralBox>
  <LowerText >Receitas</LowerText>
  <NormalText style={{ color: "green", marginBottom: 10,  }}>
    R$ {Number(revenue || 0).toFixed(2)}
  </NormalText>

  <LowerText >Despesas</LowerText>
  <NormalText style={{ color: "red" }}>
    - R$ {Number(expense || 0).toFixed(2)}
  </NormalText>

  {/* SEÇÃO DE FEEDBACK COM QUEBRA DE LINHA FORÇADA */}
  <View style={{
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    width: "100%", // OBRIGATÓRIO para o texto saber onde parar
    flexDirection: 'row', // Ajuda o container a entender o espaço interno
    flexWrap: 'wrap', // Permite que o conteúdo flua para baixo
    justifyContent: 'center'
  }}>
    <NormalText 
      numberOfLines={0} // FORÇA o componente a não limitar linhas (0 = infinito)
      style={{
        textAlign: "center",
        fontSize: 13,
        fontWeight: "bold",
        flexShrink: 1, // Permite que o texto "encolha" e quebre em vez de sair da tela
        width: '100%', // Ocupa a largura da View pai
        color: (() => {
          const res = Number(revenue) - Number(expense);
          if (res < 0) return "#ff4444";
          if (Number(expense) > Number(revenue) * 0.8) return "#ffbb33";
          return "#00C851";
        })()
      }}
    >
      {(() => {
        const rev = Number(revenue || 0);
        const exp = Number(expense || 0);
        if (rev === 0 && exp > 0) return "Cuidado!\nGastos sem receitas.";
        if (rev - exp < 0) return "Alerta crítico!\nSaldo negativo.";
        if (exp > rev * 0.8) return "Atenção!\nRevise seus gastos agora.";
        return "Tudo certo!\nContinue economizando.";
      })()}
    </NormalText>
  </View>
</GeralBox>
      </GraphicContainer>
    </GeralView>
  );
}
