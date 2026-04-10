import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainStack from "./src/routes/MainStack";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainStack />
          <StatusBar style="light" />
        </NavigationContainer>
    </GestureHandlerRootView>
  );
}