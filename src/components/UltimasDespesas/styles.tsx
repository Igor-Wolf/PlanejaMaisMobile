import styled from "styled-components";

export const LancamentosView = styled.View`
  align-items: left;
  justify-content: space-around;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  elevation: 60;
  margin: 5px;
  margin-top: 15px;

`;

export const CardContainer = styled.Pressable`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 5px;
  border: 1px solid gray;
  elevation: 50;
`;

export const LancamentosBoxLeft = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding: 5px;
`;
export const LancamentosBoxRight = styled.View`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  padding: 5px;
`;

export const NormalText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 18px;
`;
export const LowerText = styled.Text`
  color: gray;
  font-weight: 600;
  font-size: 16px;
`;
