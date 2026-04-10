import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyAccount from "../views/MyAccount/MyAccount";
import MyAccountEdit from "../views/MyAccountEdit/MyAccountEdit";


const Stack = createNativeStackNavigator();

export default function MyAccountStack() {
  return (
    <Stack.Navigator
      initialRouteName="MinhaContaPage"
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTitleStyle: { fontWeight: "bold" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="MinhaContaPage"
        component={MyAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditarMinhaConta"
        component={MyAccountEdit}
        options={{ headerShown: false }}
      />
      
      
    </Stack.Navigator>
  );
}