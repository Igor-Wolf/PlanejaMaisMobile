import React, { useState } from "react";
import { Platform, TouchableOpacity, Alert } from "react-native";
import {
  ButtonGeneral,
  ExternalContainer,
  InputText,
  NormalText,
  TitleBox,
  TitleText,
} from "./Styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as yup from "yup";
import { editExpenseService, editUserService } from "./actions"; // Note: Nome da service parece de despesa, mas o contexto é usuário.
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default function MyAccountEdit({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();

  // Estados dos inputs baseados no item recebido
  const [name, setName] = useState(item.name);
  const [user, setUser] = useState(item.user);
  const [email, setEmail] = useState(item.email);
  const [lastEmail, setLastEmail] = useState(item.lastEmail);
  const [birthday, setBirthday] = useState(new Date(item.birthday));
  const [passwordHash, setPasswordHash] = useState(item.passwordHash);

  // Estados para nova senha (opcional na edição)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [createdAt, setCreatedAt] = useState(item.createdAt);
  const [isActive, setIsActive] = useState(item.isActive);
  const [showPicker, setShowPicker] = useState(false);

  // Schema de Validação
  const userSchema = yup.object({
    name: yup.string().required("O nome é obrigatório"),
    user: yup.string().required("O usuário é obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("O e-mail é obrigatório"),
    lastEmail: yup
      .string()
      .email("Último e-mail inválido")
      .required("O último e-mail é obrigatório"),
    birthday: yup
      .date()
      .typeError("Data de nascimento inválida")
      .required("A data de nascimento é obrigatória"),

    // Senha opcional: se preencher uma, a outra deve coincidir
    password: yup.string().nullable(),
    confirmPassword: yup
      .string()
      .nullable()
      .test("passwords-match", "As senhas devem ser iguais", function (value) {
        // Pega o valor do campo password diretamente do contexto do objeto
        const { password } = this.parent;

        // Se a senha foi preenchida, o confirmPassword não pode ser diferente/vazio
        if (password && password.length > 0) {
          return value === password;
        }

        // Se a senha estiver vazia, a confirmação também pode estar
        return true;
      }),

    createdAt: yup
      .string()
      .matches(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
        "Data deve estar no formato ISO 8601",
      )
      .required("A data de criação é obrigatória"),

    isActive: yup.boolean().required("O estado 'isActive' é obrigatório"),
  });

  // Função para validar e salvar
  const handleSave = async () => {
    try {
      const formData = {
        name,
        user,
        email,
        lastEmail,
        birthday,
        password: password || null,
        confirmPassword: confirmPassword || null,
        createdAt,
        isActive,
      };

      // Valida os dados contra o schema
      await userSchema.validate(formData, { abortEarly: true });

      // Prepara o objeto final
      const updatedUser = {
        name,
        user,
        email,
        lastEmail,
        birthday: birthday.toISOString(),
        // Se o usuário digitou uma nova senha, usamos ela, caso contrário mantemos o hash antigo
        passwordHash: password ? password : passwordHash,
        createdAt,
        updatedAt: new Date().toISOString(),
        isActive,
      };

      console.log("Dados validados e prontos:", updatedUser);

      // Exemplo de chamada de serviço:

         const response = await editUserService( updatedUser);
         if (response.status === 200) {
           Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
           navigation.goBack();
         }

      //Alert.alert("Sucesso", "Dados validados com sucesso!");
    } catch (error) {
      // Exibe erro do Yup ou erro de API
      Alert.alert("Erro de Validação", error.message);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <ExternalContainer contentContainerStyle={{ gap: 15, padding: 15 }}>
      <TitleBox>
        <TitleText>Editar Conta</TitleText>
      </TitleBox>

      <NormalText>Nome:</NormalText>
      <InputText
        value={name}
        onChangeText={setName}
        placeholder="Digite o nome"
      />

      <NormalText>E-mail:</NormalText>
      <InputText
        value={email}
        onChangeText={setEmail}
        placeholder="Digite o e-mail"
        keyboardType="email-address"
      />

      <NormalText>Nova Senha (deixe vazio para não alterar):</NormalText>
      <InputText
        value={password}
        onChangeText={setPassword}
        placeholder="Digite a nova senha"
        secureTextEntry
      />

      <NormalText>Confirmar Nova Senha:</NormalText>
      <InputText
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirme a nova senha"
        secureTextEntry
      />

      <NormalText>Data de Nascimento:</NormalText>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <InputText
          value={formatDate(birthday)}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onChangeDate}
        />
      )}

      <ButtonGeneral
        onPress={handleSave}
        style={{ backgroundColor: "#066e74" }}
      >
        <NormalText style={{ color: "white" }}>Salvar Alterações</NormalText>
        <Ionicons name="save-outline" size={24} color="white" />
      </ButtonGeneral>

      <ButtonGeneral
        onPress={() => navigation.goBack()}
        style={{ backgroundColor: "red" }}
      >
        <NormalText style={{ color: "white" }}>Cancelar</NormalText>
        <Ionicons name="close-circle-outline" size={24} color="white" />
      </ButtonGeneral>
    </ExternalContainer>
  );
}
