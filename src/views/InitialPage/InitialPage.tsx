import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import {
  ImageCard,
  ImageContainer,
  ImageContainerExternal,
  PressButton,
  TextTitle,
} from "./Styles";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InitialPage() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    const storedToken = await AsyncStorage.getItem("token");

    if (storedToken !== null) {
      setLoading(false);

      navigation.navigate("Drawer");
    } else {
      setLoading(false);

      navigation.navigate("LoginPage");
    }
  };

  return (
    <>
      <PressButton onPress={handlePress}>
        <ImageContainerExternal>
          <ImageContainer>
            <ImageCard
              source={require("../../../assets/logoicon.png")}
            ></ImageCard>
          </ImageContainer>
        </ImageContainerExternal>
        <TextTitle>Planeja Mais</TextTitle>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <></>}
      </PressButton>
    </>
  );
}
