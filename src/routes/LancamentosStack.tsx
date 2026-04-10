import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialPage from "../views/InitialPage/InitialPage";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import MyDrawer from "./MainDrawer";
import ExpenseDetails from "../views/ExpensesDetails/ExpensesDetails";
import ExpenseEdit from "../views/ExpensesEdit/ExpensesEdit";
import ExpenseCreate from "../views/ExpenseCreate/ExpenseCreate";
import ExpensesMontly from "../views/ExpensesMontly/ExpensesMontly";
import ExpensesMontlyByCategory from "../views/ExpensesMontlyByCategory/ExpensesMontlyByCategory";

const Stack = createNativeStackNavigator();

export default function LancamentosStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTitleStyle: { fontWeight: "bold" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
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
      <Stack.Screen
        name="CriarLancamento"
        component={ExpenseCreate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LancamentosMensais"
        component={ExpensesMontly}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LancamentosMensaisPorCategoria"
        component={ExpensesMontlyByCategory}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
}