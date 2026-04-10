import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../views/Home/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Sobre from "../views/Sobre/Sobre";
import LancamentosStack from "./LancamentosStack";
import MyAccountStack from "./MyAccountStack";
import MetasStack from "./MetasStack";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="Lancamentos"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#2e2d2d",
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 16, // O tamanho da fonte aqui
          fontWeight: "bold", // Grossura da fonte
          marginVertical: 3, // Espaçamento entre os itens
        },
        drawerActiveTintColor: "#000000", // Cor do texto/ícone quando selecionado
        drawerInactiveTintColor: "#ffffff", // Cor do texto/ícone quando não selecionado
        drawerActiveBackgroundColor: "#525252", // Fundo do item selecionado
        headerTintColor: "#000000", // Cor do ícone hamburguer
        headerStyle: {
          height: 100, // Altura que você desejar (padrão costuma ser ~60)
          backgroundColor: "#066e74",
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
        // Ajusta o alinhamento vertical dos itens se necessário
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen
        name="Lancamentos"
        component={LancamentosStack}
        options={{ title: "Lançamentos" }}
      />
      <Drawer.Screen
        name="Metas"
        component={MetasStack}
        options={{ title: "Metas" }}
      />
      <Drawer.Screen
        name="MinhaConta"
        component={MyAccountStack}
        options={{ title: "Minha Conta" }}
      />
      <Drawer.Screen
        name="Sobre"
        component={Sobre}
        options={{ title: "Sobre" }}
      />
      <Drawer.Screen
        name="Sair"
        component={Home} // Pode ser qualquer componente, ele não será aberto
        listeners={{
          drawerItemPress: (e) => {
            // 1. Impede que a gaveta tente navegar para uma tela
            e.preventDefault();

            // 2. Sua lógica de Logout
            Alert.alert("Sair", "Deseja realmente sair?", [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Sair",
                onPress: async () => {
                  await AsyncStorage.removeItem("token");
                  // Navega de volta para a Stack de Login
                  navigation.replace("LoginPage");
                },
              },
            ]);
          },
        }}
        options={{
          drawerLabel: "Sair do App",
          // Você pode até colocar um ícone aqui
        }}
      />
    </Drawer.Navigator>
  );
}
