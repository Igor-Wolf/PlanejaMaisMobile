import React, { useCallback, useState } from "react";
import { ActivityIndicator, Alert, View, TouchableOpacity, Linking, BackHandler } from "react-native"; // Importado TouchableOpacity
import {
  BoldText,
  Container,
  ContainerButton,
  ForgotPassButton,
  ImageCard,
  ImageContainer,
  ImageContainerExternal,
  ImputNumber,
  LinkText,
  LogginButton,
  RememberMeContainer,
} from "./Styles";
import Checkbox from "expo-checkbox";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { loginService } from "./actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CREATEACCOUNT, FORGOTPASS } from "../../constants/frontLinks";
import { NormalText } from "../Home/Styles";

export default function Login() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [check, setCheck] = useState(false);




useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Atenção!", "Deseja realmente sair do aplicativo?", [
          { text: "Não", onPress: () => null, style: "cancel" },
          { text: "Sim", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      // 1. Criamos a assinatura (subscription)
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      // 2. No cleanup, chamamos o método .remove() da assinatura
      return () => subscription.remove();
    }, []),
  );






  const handlePress = async () => {
    if (!user || !pass) {
      Alert.alert("Erro", "Preencha usuário e senha");
      return;
    }    

    setLoading(true);
    try {
      const response = await loginService(user, pass, check);
      if (response && response.status === 200) {
        try {
          await AsyncStorage.setItem("token", response.data);
        } catch (e) {}

        // Se o login for sucesso, navegamos e paramos o loading
        setLoading(false);
        navigation.navigate("Drawer");
      } else {
        setLoading(false);
        Alert.alert("Erro", "Usuário ou senha inválidos");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Ocorreu um erro na conexão");
    }
  };
  const handleForgotPass = async () => {
      await Linking.openURL(FORGOTPASS);
    }
  const handleCreateAccount = async () => {
      await Linking.openURL(CREATEACCOUNT);
    }
  return (
    <Container>
      <ImageContainerExternal>
        <ImageContainer>
          <ImageCard source={require("../../../assets/logoicon.png")} />
        </ImageContainer>
      </ImageContainerExternal>

      <BoldText>Usuário:</BoldText>
      <ImputNumber
        value={user}
        onChangeText={setUser}
        placeholder="Digite o nome usuario"
      />

      <BoldText>Senha:</BoldText>
      <ImputNumber
        value={pass}
        onChangeText={setPass}
        secureTextEntry={true}
        placeholder="Digite a senha"
      />
      <RememberMeContainer>

      {/* Melhoria de UX: Clicar na View toda marca o checkbox */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
        onPress={() => setCheck(!check)}
        activeOpacity={0.7}
        >
        <Checkbox
          value={check}
          onValueChange={setCheck}
          color={check ? "#0084ff" : undefined}
          />
        <BoldText style={{ marginLeft: 8, color: "black" }}>
          Lembrar de mim?
        </BoldText>
        </TouchableOpacity>
        <ForgotPassButton onPress={handleForgotPass}>
          <LinkText>Esqueceu a senha?</LinkText>
        </ForgotPassButton>
          </RememberMeContainer>

      <ContainerButton>
        {/* Desabilitar o botão enquanto carrega evita cliques duplos */}
        <LogginButton onPress={handlePress} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#0000ff" />
          ) : (
            <BoldText>Entrar</BoldText>
          )}
        </LogginButton>
        <ForgotPassButton onPress={handleCreateAccount}>
          <LinkText>Criar uma conta</LinkText>
        </ForgotPassButton>
      </ContainerButton>
    </Container>
  );
}
