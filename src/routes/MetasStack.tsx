import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Metas from "../views/Metas/Metas";
import MetasDetails from "../views/MetasDetails/MetasDetails";
import MetasEdit from "../views/MetasEdit/MetasEdit";
import MetasCreate from "../views/MetasCreate/MetasCreate";

import ExpensesByCategory from "../views/ExpensesByCategory/ExpensesByCategory";
import ExpenseDetails from "../views/ExpensesDetails/ExpensesDetails";
import ExpenseEdit from "../views/ExpensesEdit/ExpensesEdit";
import MetasTransactions from "../views/MetasTransactions/MetasTransactions";

const Stack = createNativeStackNavigator();

export default function MetasStack() {
  return (
    <Stack.Navigator
      initialRouteName="MinhasMetas"
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTitleStyle: { fontWeight: "bold" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="MinhasMetas"
        component={Metas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetalhesMetas"
        component={MetasDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditarMetas"
        component={MetasEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CriarMetas"
        component={MetasCreate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CriarTransacao"
        component={MetasTransactions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UltimasMovimentacoes"
        component={ExpensesByCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detalhes"
        component={ExpenseDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditarLancamento"
        component={ExpenseEdit}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
