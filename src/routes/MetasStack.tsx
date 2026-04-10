import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Metas from "../views/Metas/Metas";

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
    </Stack.Navigator>
  );
}
