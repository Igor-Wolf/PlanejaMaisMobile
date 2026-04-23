import styled from "styled-components";

export const ExternalContainer = styled.View`
  width: 100%;
  padding-left:5px;
  padding-right:5px;
  padding-top: 0;
  padding-bottom:0;
`;

export const ExternalBar = styled.View`
  height: 20px;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
`;

export const InternallBar = styled.View`
  height: 100%;
  background-color: #007aff;
  border-radius: 10px;
`;

export const BarText =styled.Text`
    

    color: black;
    position: absolute;
    z-index:1;
    align-self: center;
    font-weight: 600;
    font-size: 14px;
    

`
