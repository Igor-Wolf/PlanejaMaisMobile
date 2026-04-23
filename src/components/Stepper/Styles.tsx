import styled from "styled-components";




export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  border-radius: 12px;
  width: 160px;
  height: 48px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
`;

export const Button = styled.Pressable`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* Efeito visual ao pressionar é feito via style prop no Pressable */
`;

export const ValueContainer = styled.View`
  flex: 1.5;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-left-width: 1px;
  border-right-width: 1px;
  border-color: #e0e0e0;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #066e74;
`;

export const IconText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.color || "#333"};
`;