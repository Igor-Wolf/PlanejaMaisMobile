import { Text, View } from "react-native";
import {
  GeneralContainer,
  LogoImage,
  LowerText,
  NormalText,
  SclrollContainer,
} from "./Styles";
import MinhaFoto from "../../../assets/logoicon.png";
import { VERSION } from "../../constants/version-constant";

export default function Sobre() {
  return (
    <SclrollContainer>
      <GeneralContainer>
        <LogoImage source={MinhaFoto} />
        <NormalText>
          Planeja + é um aplicativo de despesas pessoais. Não possui fins lucrativos, criado por Igor Barbosa.
          Produzido como parte do projeto Planeja + de Cheyenne Cattani e Igor
          Barbosa.
        </NormalText>
        <LowerText>
          A sua versão é {VERSION}

        </LowerText>
      </GeneralContainer>
    </SclrollContainer>
  );
}
