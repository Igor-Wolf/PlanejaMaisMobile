import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../api/backApi";

export const deleteExpenseService = async (_id: string) => {
  const storedToken = await AsyncStorage.getItem("token");

  if (!storedToken) return;
  const headersRes = { Authorization: `Bearer ${storedToken}` };

  
  try {
    const response = await api.delete(`/expense/delete/${_id}`,  {
      headers: headersRes,
    });
    console.log("SUCESSO:", response.status);
    return response;
  } catch (error: any) {
    console.log("ERRO NA API:", error.response?.status, error.response?.data);

    if (!error.response) {
      return { status: 500, data: "Erro de rede" };
    }
    return error.response;
  }
};