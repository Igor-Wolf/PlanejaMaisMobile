import { RefreshControl } from "react-native";
import Goals from "../../components/Goals";
import { Create, NormalText, SclrollContainer } from "./Styles";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ActionMenuMetas from "../../components/ActionMenuMetas";


export default function Metas() {
  const [refreshing, setRefreshing] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);


  const onRefresh = async () => {
    setRefreshing(true);
  };

  return (<>
    <SclrollContainer
      contentContainerStyle={{
        gap: 15,
        paddingTop: 5,
        paddingBottom: 50,
        paddingLeft: 5,
        paddingRight: 5,
      }}
      // 4. Configuração do controle de atualização
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={["#066e74"]} // Android
        tintColor={"#066e74"} // iOS
        />
      }
      >
        
      <Goals refreshing={refreshing} setRefreshing={setRefreshing}></Goals>
    </SclrollContainer>
      <Create onPress={() => setMenuVisible(true)}>
              <Ionicons name="add-circle-outline" size={35} color="white" />
    </Create>
    <ActionMenuMetas
              visible={menuVisible}
              onClose={() => setMenuVisible(false)}
            />
      </>
  );
}
