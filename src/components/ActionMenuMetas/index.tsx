import React from "react";
import { Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Overlay, MenuBox, MenuItem, MenuText } from "./Styles"; // Removi Divider se não usar
import { useNavigation } from "@react-navigation/native";

export default function ActionMenuMetas({ visible, onClose }) {
  const navigation = useNavigation();

  const onAdd = () => {
    // Fecha o modal antes de navegar para evitar sobreposição visual
    onClose(); 
    navigation.navigate("CriarMetas");
  };  

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay onPress={onClose}>
        <MenuBox>
          <MenuItem onPress={onAdd}>
            <Ionicons name="add-circle-outline" size={20} color="#4caf50" />
            <MenuText>Nova Meta</MenuText>
          </MenuItem>          
        </MenuBox>
      </Overlay>
    </Modal>
  );
}