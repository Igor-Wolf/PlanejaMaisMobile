import { useEffect, useState } from "react";
import {
  CardContainer,
  LancamentosBoxLeft,
  LancamentosBoxRight,
  LancamentosView,
  LowerText,
  NormalText,
} from "./styles";
import { api } from "../../api/backApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ActionCardMenu from "../ActionCardMenu";

export default function UltimasMovimentacoes({category=''}) {
  const navigation = useNavigation();

  const [lancamentos, setLancamentos] = useState();

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [itemToSend, setItemToSend] = useState(null);

  const openMenu = (event, item) => { // Adicione item aqui
  const { pageX, pageY } = event.nativeEvent;
  setItemToSend(item); // Guarde o item clicado
  setMenuPosition({ x: pageX, y: pageY });
  setMenuVisible(true);
};

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (!storedToken) return;

        const headers = { Authorization: `Bearer ${storedToken}` };
        // Fazendo as requisições em paralelo
        const [authRes, lancamentosRes] = await Promise.all([
          api.get("/login/protected", { headers }),
          api.get(`/expense/myExpenseByFilter?category=${encodeURIComponent(category)}`, { headers }),
        ]);

        if (authRes.status === 200) {
          setLancamentos(lancamentosRes.data);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    loadData();
  }, []); // <--- OBRIGATÓRIO ser um Array [dataRef]

  const handlePress = (item) => {
    navigation.navigate("Detalhes", { item });
  };
  return (
    <LancamentosView>
      <ActionCardMenu 
  visible={menuVisible} 
  onClose={() => setMenuVisible(false)} 
  position={menuPosition}
  item={itemToSend} // Adicione esta prop
/>
      <NormalText style={{marginBottom: "20"}}>Movimentações </NormalText>
      {lancamentos && lancamentos.length > 0 ? (<>
        {lancamentos.map((item) => (
          <CardContainer key={item._id} onPress={() => handlePress(item)} onLongPress={(e) => openMenu(e, item)}>
            <LancamentosBoxLeft>
              <NormalText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ flex: 1 }}>{item.description}</NormalText>
              <LowerText numberOfLines={1}
                ellipsizeMode="tail"
                style={{ flex: 1 }}>{item.category}</LowerText>
            </LancamentosBoxLeft>

            <LancamentosBoxRight>
              <NormalText>
                {" "}
                {item.value > 0
                  ? `R$ ${item.value.toFixed(2)}`
                  : `- R$ ${Math.abs(item.value).toFixed(2)}`}
              </NormalText>
              <LowerText>
                {new Date(item.date).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </LowerText>
            </LancamentosBoxRight>
          </CardContainer>
        ))
        }
        {/* Impacto no Saldo */}
<NormalText style={{ marginTop: 10 }}>
  Impacto no saldo:{" "}
  {lancamentos && (() => {
    const total = lancamentos.reduce((acc, item) => acc + (Number(item.value) || 0), 0);
    const isPositivo = total >= 0;
    const valorFormatado = isPositivo 
    ? `R$ ${total.toFixed(2).replace('.', ',')}` 
    : `- R$ ${Math.abs(total).toFixed(2).replace('.', ',')}`;
    
    return (
      <NormalText style={{ color: isPositivo ? "green" : "red", fontWeight: "bold" }}>
        {valorFormatado}
      </NormalText>
    );
  })()}
</NormalText>

{/* Total Investido */}
<NormalText style={{ marginTop: 10 }}>
  Total investido:{" "}
  {lancamentos && (() => {
    const soma = lancamentos.reduce((acc, item) => acc + (Number(item.value) || 0), 0);
    const totalInvertido = soma * -1;
    const isPositivo = totalInvertido >= 0;
    const valorFormatado = isPositivo 
    ? `R$ ${totalInvertido.toFixed(2).replace('.', ',')}` 
    : `- R$ ${Math.abs(totalInvertido).toFixed(2).replace('.', ',')}`;
    
    return (
      <NormalText style={{ color: isPositivo ? "green" : "red", fontWeight: "bold" }}>
        {valorFormatado}
      </NormalText>
    );
  })()}
</NormalText></>
      ) : (
        <NormalText style={{ textAlign: "center",  }}>
          Nenhum lançamento encontrado.
        </NormalText>
      )}
      
    
 
    </LancamentosView>
  );
}
