import styled from "styled-components";
import { Picker } from "@react-native-picker/picker";

export const CardContainer = styled.Pressable`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 5px;
  background-color: #242222;
  border-radius: 20px;
  elevation: 50;
  margin-bottom: 5px;
`;

export const LancamentosBoxLeft = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding: 5px;
  flex: 1;
`;
export const LancamentosBoxRight = styled.View`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  padding: 5px;
`;

export const BoxGoals = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 5px;
`;

export const NormalTextCategory = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 18px;
  border-radius: 50px;
  border: 1px solid white;
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

export const StyledPicker = styled(Picker)`
  height: 30px;
  width: 50px;
  background-color: black;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: white;
`;

export const TopBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SelectedOrderBox = styled.View`
  display: flex;
  flex-direction: row;
`;
