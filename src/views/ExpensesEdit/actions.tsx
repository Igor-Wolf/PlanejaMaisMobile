import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../api/backApi";

export const editExpenseService = async (
  _id: string,
  body: any,
) => {

    const storedToken = await AsyncStorage.getItem("token");

    if (!storedToken) return;
    const headersRes = { Authorization: `Bearer ${storedToken}` };

    console.log(_id)
    console.log(body)
  try {
const response = await api.patch(`/expense/update/${_id}`, body, { headers: headersRes });    console.log("SUCESSO:", response.status);
    return response;
  } catch (error: any) {
    console.log("ERRO NA API:", error.response?.status, error.response?.data);

    if (!error.response) {
      return { status: 500, data: "Erro de rede" };
    }
    return error.response;
  }
};