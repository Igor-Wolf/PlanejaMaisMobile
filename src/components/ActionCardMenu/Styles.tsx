import styled from 'styled-components/native';

// Ocupa a tela toda para detectar o clique fora
export const Overlay = styled.Pressable`
  flex: 1;
`;

// A caixinha quadrada
export const MenuBox = styled.View`
  position: absolute;
  right: 20px;       /* Ajuste conforme a posição do seu botão + */
  bottom: 30px;        /* Ajuste conforme a altura do seu botão + */
  width: 150px;
  height:150px;
  background-color: #1a1a1a; /* Fundo preto/grafite */
  border-radius: 12px;
  padding: 10px;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 10px;
`;

export const MenuText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #333;
  margin-vertical: 5px;
`;