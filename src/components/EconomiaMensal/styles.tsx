import styled from "styled-components";

export const GeralView = styled.View`

  background-color: #242222;
  
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

export const GeralBox = styled.View`
  display: flex;
  align-items: flex-end; 
  justify-content: flex-end;
  flex-direction: column;
  width: 40%;
  padding:5px;
`;

export const NormalText = styled.Text`
    

    color: white;
    font-weight: 600;
    font-size: 18px;

`
export const LowerText = styled.Text`
    

    color: gray;
    font-weight: 600;
    font-size: 16px;
    padding-top: 10px;

`

export const GraphicContainer = styled.View`

    display:flex;
    flex-direction: row;
    justify-content:space-between;

`

export const GraphicView = styled.View`
    

    display: flex;
    width: 60%;
    align-items: center;
    justify-content: center;
    padding:10px;

`