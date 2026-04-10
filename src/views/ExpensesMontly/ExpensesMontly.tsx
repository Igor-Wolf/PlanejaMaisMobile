import { useNavigation } from "@react-navigation/native";
import { ButtonGeneral, ExternalContainer, NormalText, TitleText } from "./Styles";
import UltimosLancamentos from "../../components/UltimosLancamentos";
import UltimasReceitas from "../../components/UltimasReceitas";
import { Text } from "react-native";
import { useEffect, useState } from "react";


import Ionicons from "@expo/vector-icons/Ionicons";
import UltimasDespesas from "../../components/UltimasDespesas";






export default function ExpensesMontly({ route }) {
    const {dataRef, item} = route.params;
    const navigation = useNavigation();


    const [isoDate, setIsoDate] = useState(dataRef.toISOString().slice(0, 7))
    const [screenChosed, setScreenChosed] = useState(item.type)

    useEffect(() => {


        setIsoDate(dataRef.toISOString().slice(0, 7))
        setScreenChosed(item.type) 

        }, [dataRef, item.type]);

    
    
    return (
        
        <ExternalContainer>
            <TitleText>Lançamentos</TitleText>
            
            {
                screenChosed == '+' ? <UltimasReceitas date={isoDate}></UltimasReceitas> : <UltimasDespesas date={isoDate}></UltimasDespesas>
            }
            <ButtonGeneral
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: "red" }}
                  >
                    <NormalText>Voltar</NormalText>
                    <Ionicons name="arrow-undo-sharp" size={24} color="white" />
                  </ButtonGeneral>
        </ExternalContainer>
    )
}