import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../api/backApi";

export const editUserService = async (body: any) => {
  const storedToken = await AsyncStorage.getItem("token");

  // Se não houver token, retorne um erro estruturado para o componente saber o que houve
  if (!storedToken) {
    return { status: 401, data: "Token não encontrado" };
  }

  const headersRes = { Authorization: `Bearer ${storedToken}` };

  console.log("Enviando para a API:", body);

  try {
    // Verifique se a rota é realmente /login/update. 
    // Se o erro persistir, confirme no seu Backend se a rota não é /user/update ou similar.
    const response = await api.patch("/login/update", body, { 
      headers: headersRes 
    });

    console.log("RESPOSTA SUCESSO:", response.status);
    return response;
  } catch (error: any) {
    // Esse log aqui vai te dizer exatamente o que o backend respondeu
    console.log("ERRO NA API:", error.response?.status, error.response?.data);

    if (!error.response) {
      return { status: 500, data: "Erro de rede ou servidor offline" };
    }
    return error.response;
  }
};