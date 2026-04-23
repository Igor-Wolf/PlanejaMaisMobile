import React from "react";
import { Modal, Dimensions, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Overlay, MenuBox, MenuItem, MenuText } from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { deleteExpenseService, deleteMetaService } from "./action";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ActionCardMenuMeta({ visible, onClose, position, item, valorAtual}) {
  const navigation = useNavigation();

  if (!position) return null;

  // 1. Defina as dimensões esperadas do seu MenuBox
  const menuWidth = 160; 
  const menuHeight = 150; // Ajustado para 3 itens + paddings
  const margin = 12;      // Margem mínima da borda da tela

  // --- LÓGICA DE POSICIONAMENTO VERTICAL (TOP) ---
  let adjustedTop = position.y -50;
  // Se o menu for ultrapassar a altura da tela, ele abre para cima do clique
  if (position.y + menuHeight > SCREEN_HEIGHT - margin) {
    adjustedTop = position.y - menuHeight +50 ;
  }

  // --- LÓGICA DE POSICIONAMENTO HORIZONTAL (LEFT) ---
  // Tenta centralizar o menu em relação ao clique (clique - metade da largura)
  let adjustedLeft = position.x - (menuWidth / 2); 

  // Ajuste para não sair pela ESQUERDA
  if (adjustedLeft < margin) {
    adjustedLeft = margin;
  }

  // Ajuste para não sair pela DIREITA
  if (adjustedLeft + menuWidth > SCREEN_WIDTH - margin) {
    adjustedLeft = SCREEN_WIDTH - menuWidth - margin;
  }

  const onDetails = () => {
      onClose();
      navigation.navigate("DetalhesMetas", { item, valorAtual })
    
  };

  const onEdit = () => {
    onClose();
    navigation.navigate("EditarMetas", { item});
  };

  const onDelete = async () => {
    onClose();
      console.log(item._id)
        try {
          const response = await deleteMetaService(item._id);
          if (response.status === 200) {
            Alert.alert("Sucesso", "Meta deletada com sucesso!");
            navigation.push("MinhasMetas");
          }
        } catch {
          Alert.alert("Erro ");
        }
     
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay onPress={onClose}>
        <MenuBox
          style={{
            position: 'absolute',
            top: adjustedTop,
            left: adjustedLeft,
            width: menuWidth,
            // Adicionei uma pequena elevação extra via inline para garantir sobreposição
            elevation: 5,
            zIndex: 999,
          }}
        >
          <MenuItem onPress={onDetails}>
            <Ionicons name="information-circle-outline" size={20} color="#4caf50" />
            <MenuText>Detalhes</MenuText>
          </MenuItem>

          <MenuItem onPress={onEdit}>
            <Ionicons name="create-outline" size={20} color="#ffbb33" />
            <MenuText>Editar</MenuText>
          </MenuItem>

          <MenuItem onPress={onDelete}>
            <Ionicons name="trash-outline" size={20} color="#ff4444" />
            <MenuText>Deletar</MenuText>
          </MenuItem>
        </MenuBox>
      </Overlay>
    </Modal>
  );
}