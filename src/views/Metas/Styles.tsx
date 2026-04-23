import styled from "styled-components";



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