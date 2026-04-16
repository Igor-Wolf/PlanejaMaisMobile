import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from "react-native-gifted-charts";

import { GeralView, GraphicContainer, GraphicView, NormalText } from "./styles";
import { api } from "../../api/backApi";
import { useNavigation } from "@react-navigation/native";

const COLORS = [
  "#54DBEA",
  "#90EE90",
  "#FFA500",
  "#FF6B6B",
  "#8E44AD",
  "#34495E",
  "#1ABC9C",
];

export default function DespesasPorCategoria({ dataRef }) {
  const navigation = useNavigation();
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const storedToken = await AsyncStorage.getItem("token");
        if (!storedToken) return;

        const isoDataRef =
          dataRef instanceof Date
            ? dataRef.toISOString().slice(0, 7)
            : new Date().toISOString().slice(0, 7);

        const headers = { Authorization: `Bearer ${storedToken}` };

        const [authRes, expenseRes] = await Promise.all([
          api.get("/login/protected", { headers }),
          api.get(`/expense/myExpenseByDate/${isoDataRef}?endValue=0`, {
            headers,
          }),
        ]);

        if (authRes.status === 200 && Array.isArray(expenseRes.data)) {
          const rawData = expenseRes.data;

          // 1. AGRUPAR USANDO AS CHAVES CORRETAS (category e value)
          const grouped = rawData.reduce((acc, curr) => {
            // Ajustado para 'category' conforme seu padrão
            const cat = curr.category || "Outros";

            // Ajustado para 'value' e convertido para positivo (Math.abs)
            const valorBruto = Number(curr.value) || 0;
            const valorPositivo = Math.abs(valorBruto);

            if (valorPositivo > 0) {
              acc[cat] = (acc[cat] || 0) + valorPositivo;
            }
            return acc;
          }, {});

          // 2. CALCULAR TOTAL
          const totalSum = Object.values(grouped).reduce((a, b) => a + b, 0);
          setTotal(totalSum);

          // 3. FORMATAR PARA O GRÁFICO
          const formatted = Object.keys(grouped).map((key, index) => {
            const val = grouped[key];
            const percentage =
              totalSum > 0 ? ((val / totalSum) * 100).toFixed(0) : 0;

            return {
              value: val,
              color: COLORS[index % COLORS.length],
              label: key,
              text: `${percentage}%`,
              onPress: () => {
                navigation.navigate("LancamentosMensaisPorCategoria", {
                  dataRef,
                  item: { type: "-" },
                  category: { value: key },
                });
              },
            };
          });

          setChartData(formatted);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do gráfico:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataRef]);

  const renderLegend = (text, color) => (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 12,
        alignItems: "center",
        width: "45%",
      }}
    >
      <View
        style={{
          height: 16,
          width: 16,
          marginRight: 10,
          borderRadius: 4,
          backgroundColor: color,
        }}
      />
      <Text
        ellipsizeMode="tail"
        style={{ color: "white", fontSize: 12, flex: 1 }}
        numberOfLines={1}
      >
        {text}
      </Text>
    </View>
  );

  return (
    <GeralView>
      <NormalText style={{ marginBottom: 20 }}>
        Despesas por Categoria
      </NormalText>

      <GraphicContainer>
        <GraphicView
          style={{
            borderRadius: 20,
            paddingVertical: 30,
            width: "100%",
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#54DBEA" />
          ) : chartData.length > 0 ? (
            <>
              <PieChart
                key={JSON.stringify(chartData)}
                donut
                data={chartData}
                radius={110}
                innerRadius={65}
                innerCircleColor="#242222"
                centerLabelComponent={() => (
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      - R$ {total.toFixed(2)}
                    </Text>
                    <Text style={{ color: "white", fontSize: 12 }}>Total</Text>
                  </View>
                )}
                showText
                textColor="black"
                textSize={12}
                fontWeight="bold"
                showTextBackground
                textBackgroundRadius={12}
              />

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: 25,
                  paddingHorizontal: 10,
                }}
              >
                {chartData.map((item, index) => (
                  <React.Fragment key={`legend-${index}`}>
                    {renderLegend(item.label, item.color)}
                  </React.Fragment>
                ))}
              </View>
            </>
          ) : (
            <Text style={{ color: "white", padding: 20 }}>
              Nenhuma despesa encontrada
            </Text>
          )}
        </GraphicView>
      </GraphicContainer>
    </GeralView>
  );
}
