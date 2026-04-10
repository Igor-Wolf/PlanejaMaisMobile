import styled from "styled-components";

export const GeralView = styled.View`

  background-color: #242222;
  height: 150px;
  align-items: left;
  justify-content: space-around;
  border-radius: 10px;
  display:flex;
  flex-direction: column;
  padding: 10px;
  elevation: 60;
  margin:5px;
  margin-top:15px;

`;

export const GeralBox = styled.TouchableOpacity`
    
    display:flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 5px;
    elevation: 50;
`

export const NormalText = styled.Text`
    

    color: white;
    font-weight: 600;
    font-size: 18px;

`
export const LowerText = styled.Text`
    

    color: gray;
    font-weight: 600;
    font-size: 16px;

`