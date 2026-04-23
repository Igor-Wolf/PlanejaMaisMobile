import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../api/backApi";

// Definindo uma interface simples para o corpo da meta
interface GoalBody {
  title: string;
  month: number;
  year: number;
  goal: number;
  updatedAt: string;
}

export const createGoalService = async (  
  body: GoalBody,
) => {
  try {
    const storedToken = await AsyncStorage.getItem("token");

    // Em vez de apenas retornar, lançamos um erro ou retornamos um objeto padronizado
    if (!storedToken) {
      return { status: 401, data: "Usuário não autenticado" };
    }

    const headersRes = { Authorization: `Bearer ${storedToken}` };

    // Debugs úteis para desenvolvimento
    

    const response = await api.post(`/goal/create`, body, { 
      headers: headersRes 
    });

    console.log("SUCESSO:", response.status);
    return response;

  } catch (error: any) {
    // Tratamento de erro mais detalhado
    console.error("ERRO NA API:", error.response?.status, error.response?.data);

    // Retornamos sempre um objeto que contenha a propriedade 'status'
    // para não quebrar o seu componente .onPress
    return (
      error.response || { 
        status: 500, 
        data: { message: "Erro interno ou de rede" } 
      }
    );
  }
};