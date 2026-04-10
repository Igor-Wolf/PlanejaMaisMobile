import styled from "styled-components";

export const ExternalContainer = styled.ScrollView`
  display: flex;
  flex: 1;
  background-color: black;
  flex-direction: column;
  padding-top: 10px;
`;


export const NormalText = styled.Text`
    

    color: white;
    font-weight: 600;
    font-size: 18px;

`


export const ButtonGeneral = styled.TouchableOpacity`
    
    display:flex;
    flex-direction: row;
    gap: 10px;    
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    elevation: 50;

`

export const TitleText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 30px;
`;