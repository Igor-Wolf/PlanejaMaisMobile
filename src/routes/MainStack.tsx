// Altere para native-stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialPage from "../views/InitialPage/InitialPage";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import MyDrawer from "./MainDrawer";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="InitialPage"
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTitleStyle: { fontWeight: "bold" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="InitialPage"
        component={InitialPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginPage"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}