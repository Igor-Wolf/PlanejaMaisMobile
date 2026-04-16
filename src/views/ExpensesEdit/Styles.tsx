import styled from "styled-components";
import { Dropdown } from "react-native-element-dropdown";

export const ExternalContainer = styled.ScrollView`
  display: flex;
  flex: 1;
  background-color: black;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 20px;
  
`;

export const TitleBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonDelete = styled.TouchableOpacity`
  background-color: red;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 10px;
  elevation: 50;
`;
export const ButtonGeneral = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  elevation: 50;
`;
export const CategoryContainerExternal = styled.View`
  align-self: flex-start;
`;

export const CategoryContainer = styled.View`
  flex-direction: row;
  background-color: #066e74;
  border-radius: 50px;
  padding: 5px 15px;
`;

export const TitleText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 30px;
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

export const InputText = styled.TextInput`
  width: 100%;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid black;
  color: black;
`;

export const StyledDropdown = styled(Dropdown).attrs({})`
  width: 100%;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid black;
  color: black;
  height: 45px;
  padding-left: 5px;
`;
