import React, { useEffect, useState, useCallback } from "react";
import { RefreshControl, Alert, ActivityIndicator } from "react-native";
import {
  ButtonDelete,
  ButtonGeneral,
  ExternalContainer,
  LowerText,
  NormalText,
  TitleBox,
  TitleText,
} from "./Styles";
import { deleteUser, getUserInfo } from "./actions";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyAccount() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(false);

  // 1. Função de busca isolada para ser reutilizada
  const userRequest = async () => {
    try {
      const response = await getUserInfo();
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os dados da conta.");
    } finally {
      setRefreshing(false);
    }
  };

  // 2. useFocusEffect: Atualiza os dados toda vez que você volta para esta tela
  useFocusEffect(
    useCallback(() => {
      userRequest();
    }, []),
  );

  // 3. Função para o Pull-to-Refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await userRequest();
    setRefreshing(false);
  };

  const handlePressEdit = () => {
    if (userData) {
      navigation.navigate("EditarMinhaConta", { item: userData });
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    const response = await deleteUser();

    if (response && response.status === 200) {
      console.log("Usuário deletado com sucesso");
      await AsyncStorage.removeItem("token");
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginPage" }],
      });
    }
    setLoading(false);
  };

  const handlePressDelete = () => {
    Alert.alert("Atenção!", "Deseja realmente excluir sua conta?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: handleDelete, // Apenas passe a referência aqui
      },
    ]);
  };

  // Função auxiliar para evitar erros de "Invalid Date" antes dos dados chegarem
  const formatDate = (dateString, options = {}) => {
    if (!dateString) return "...";
    return new Date(dateString).toLocaleString("pt-BR", options);
  };

  return (
    <ExternalContainer
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
      {loading && (
        <ActivityIndicator
          size="large"
          color="#54DBEA"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}
      {!refreshing && (
        <>
          <TitleBox>
            <TitleText>Detalhes da Conta</TitleText>
            <ButtonDelete onPress={handlePressDelete}>
              <Ionicons name="trash-outline" size={24} color="white" />
            </ButtonDelete>
          </TitleBox>

          <NormalText>Nome:</NormalText>
          <LowerText>{userData?.name || "Carregando..."}</LowerText>

          <NormalText>Usuário:</NormalText>
          <LowerText>{userData?.user || "..."}</LowerText>

          <NormalText>Email:</NormalText>
          <LowerText>{userData?.email || "..."}</LowerText>

          <NormalText>Aniversário:</NormalText>
          <LowerText>
            {formatDate(userData?.birthday, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </LowerText>

          <NormalText>Criação:</NormalText>
          <LowerText>
            {formatDate(userData?.createdAt, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </LowerText>

          <NormalText>Última Atualização:</NormalText>
          <LowerText>
            {formatDate(userData?.updatedAt, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </LowerText>

          <NormalText>Situação da Conta:</NormalText>
          <LowerText>{userData?.isActive ? "Ativa" : "Inativa"}</LowerText>

          <ButtonGeneral
            onPress={handlePressEdit}
            style={{ backgroundColor: "#066e74", marginTop: 10 }}
          >
            <NormalText style={{ color: "white" }}>Editar</NormalText>
            <Ionicons name="create-sharp" size={24} color="white" />
          </ButtonGeneral>

          <ButtonGeneral
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: "red" }}
          >
            <NormalText style={{ color: "white" }}>Voltar</NormalText>
            <Ionicons name="arrow-undo-sharp" size={24} color="white" />
          </ButtonGeneral>
        </>
      )}
    </ExternalContainer>
  );
}
