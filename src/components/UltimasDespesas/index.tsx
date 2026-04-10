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

export default function UltimasDespesas({date, category=''}) {
  const navigation = useNavigation();

  const [lancamentos, setLancamentos] = useState();

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [itemToSend, setItemToSend] = useState(null);
  const [categoryChosed, setCategoryChosed] = useState(category);
  

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
          api.get(`/expense/myExpenseByDate/${date}?endValue=0&category=${encodeURIComponent(categoryChosed)}`, { headers }),
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
      <NormalText style={{marginBottom: "20"}}>Despesas { date}</NormalText>
      {lancamentos && lancamentos.length > 0 ? (
        lancamentos.map((item) => (
          <CardContainer key={item._id} onPress={() => handlePress(item)} onLongPress={(e) => openMenu(e, item)}>
            <LancamentosBoxLeft>
              <NormalText>{item.description}</NormalText>
              <LowerText>{item.category}</LowerText>
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
      ) : (
        <NormalText style={{ textAlign: "center", marginTop: 20 }}>
          Nenhum lançamento encontrado para este mês.
        </NormalText>
      )}
    </LancamentosView>
  );
}
