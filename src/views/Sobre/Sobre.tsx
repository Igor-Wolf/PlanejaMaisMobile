import { Linking, Text, View } from "react-native";
import {
  ButtonText,
  DonwloadButton,
  GeneralContainer,
  LogoImage,
  LowerText,
  NormalText,
  SclrollContainer,
} from "./Styles";
import MinhaFoto from "../../../assets/logoicon.png";
import { VERSION } from "../../constants/version-constant";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { VersionApi } from "../../api/VersionAPI";

export default function Sobre() {
  const navigation = useNavigation();
  const [versionReq, setVersionReq] = useState();
  const [urlReq, setUrlReq] = useState();
  const [dateBuild, setDateBuild] = useState();

  const versionRequest = async () => {
    const response = await VersionApi.get("/latest");

    if (response.status === 200) {
      setVersionReq(response.data.tag_name);
      setUrlReq(response.data.assets[0].browser_download_url);
      setDateBuild(response.data.assets[0].updated_at);
    }
  };

  useEffect(() => {
    versionRequest();
  }, []);

  const openUrl = async () => {
    if (urlReq) {
      await Linking.openURL(urlReq);
    }
  };

  return (
    <SclrollContainer contentContainerStyle={{ 
    paddingBottom: 40, // Ajuste o valor conforme a necessidade
    
  }}>
      <GeneralContainer>
        <LogoImage source={MinhaFoto} />
        <NormalText>
          Planeja + é um aplicativo de despesas pessoais. Não possui fins
          lucrativos, criado por Igor Barbosa. Produzido como parte do projeto
          Planeja + de Cheyenne Cattani e Igor Barbosa.
        </NormalText>
        <LowerText>A sua versão é {VERSION}</LowerText>
        {versionReq && (
          <>
            <LowerText>
              A versão mais recente disponível é{" "}
              {versionReq} de {dateBuild && (new Intl.DateTimeFormat('pt-BR').format(new Date(dateBuild)))}
            </LowerText>
            <DonwloadButton  styles={{marginBotton: 40}}>
              <ButtonText onPress={openUrl}>Baixar</ButtonText>
            </DonwloadButton>
          </>
        )}
       
      </GeneralContainer>
    </SclrollContainer>
  );
}
