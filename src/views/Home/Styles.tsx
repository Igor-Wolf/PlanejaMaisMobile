import styled from "styled-components";

export const DateView = styled.View`

  background-color: black;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  display:flex;
  flex-direction: row;
  width:100%;
  padding: 10px;
`;
export const SclrollContainer = styled.ScrollView`
  flex: 1;
  background-color: black;
  height: 100%;
  padding-bottom: 120px;
`;


export const NormalText = styled.Text`
    

    color: white;
    font-weight: 600;
    font-size: 18px;

`

export const DateButton = styled.TouchableOpacity`
  width: 10%;
  aspect-ratio: 1;
  border-radius: 8px;
  align-items:center;
  justify-content: center;
  elevation: 50;
  border: 1px solid white;
  margin: 10px;
`;




export const Create = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    bottom: 60px;
    display: flex;
    background-color: #066e74;
    border-radius: 15px;
    padding: 5px;
    margin: 5px;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content:center;
    border: 1px solid black;
    z-index: 2;
    elevation: 5;
`