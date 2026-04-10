import styled from "styled-components";

export const PressButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #066e74;
`;

export const ImageCard = styled.Image`
  width: 90px; /* Defina o tamanho da imagem */
  height: 90px; /* Defina o tamanho da imagem */
  border-radius: 10px; /* Se desejar bordas arredondadas */
`;

export const ImageContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 70px;
  width: 140px;
  height: 140px;
  border: 2px solid black;
  background-color: #cccaca;
`;

export const ImageContainerExternal = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Definindo o estilo para o texto com efeito neon
export const TextTitle = styled.Text`
  font-family: "DancingScript-Bold";
  font-size: 40px;
  font-weight: 600;
  color: #fff; /* Cor do texto */

  text-shadow-color: #fff;
  text-shadow-offset: 0 0; /* Primeira sombra */
  text-shadow-radius: 5px;

  /* Segunda camada da sombra (mais intensa e azul) */
  text-shadow-color: #000308;
  text-shadow-offset: 0 0;
  text-shadow-radius: 10px;

  /* Terceira camada da sombra (mais intensa e azul) */
  text-shadow-color: #000000;
  text-shadow-offset: 0 0;
  text-shadow-radius: 15px;
`;
