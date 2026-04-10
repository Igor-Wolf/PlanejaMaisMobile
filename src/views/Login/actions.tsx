import { api } from "../../api/backApi";

export const loginService = async (
  user: string,
  pass: string,
  check: boolean,
) => {
  const body = {
    user,
    passwordHash: pass,
    remember: check,
  };

  try {
    const response = await api.post(`/login/autentication`, body);
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
