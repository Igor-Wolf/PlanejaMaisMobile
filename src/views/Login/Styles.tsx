import styled from "styled-components";

export const ImputNumber = styled.TextInput`
  width: 100%;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid black;
  color: black;
`;

export const Container = styled.View`
  display: flex;
  justify-content: center;
  flex: 1;
  padding: 10px;
  background-color: #066e74;
`;

export const LogginButton = styled.TouchableOpacity`
  display: flex;
  background-color: gray;
  border-radius: 15px;
  padding: 5px;
  margin: 5px;
  width: 30%;
  height: 60px;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  elevation: 10;
`;

export const ContainerButton = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

export const BoldText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: black;
  padding: 5px;
  margin-right: 10px;
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
  background-color: white;
  border-radius: 70px;
  width: 140px;
  height: 140px;
  border: 2px solid black;
`;

export const ImageContainerExternal = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RememberMeContainer = styled.View`
  

  display:flex;
  flex-direction: row ;
  align-items: center;
  justify-content:space-between;
  

`

export const ForgotPassButton = styled.TouchableOpacity`
  
display: flex;
align-items:flex-end;
justify-content:center;
flex-direction: row;

`

export const LinkText = styled.Text`
  
  color: purple;
  font-size: 16px;
  text-decoration-line: underline;
`
