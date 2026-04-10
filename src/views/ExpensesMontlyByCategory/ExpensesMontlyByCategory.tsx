import { useNavigation } from "@react-navigation/native";
import { ButtonGeneral, ExternalContainer, NormalText, TitleText } from "./Styles";
import UltimosLancamentos from "../../components/UltimosLancamentos";
import UltimasReceitas from "../../components/UltimasReceitas";
import { Text } from "react-native";
import { useEffect, useState } from "react";


import Ionicons from "@expo/vector-icons/Ionicons";
import UltimasDespesas from "../../components/UltimasDespesas";






export default function ExpensesMontlyByCategory({ route }) {
    const {dataRef, item, category} = route.params;
    const navigation = useNavigation();


    const [isoDate, setIsoDate] = useState(dataRef.toISOString().slice(0, 7))
    const [screenChosed, setScreenChosed] = useState(item.type)
    const [categoryChoosed, setCategoryChosed] = useState(category.value)

    useEffect(() => {


        setIsoDate(dataRef.toISOString().slice(0, 7))
        setScreenChosed(item.type) 
        setCategoryChosed(category.value)

        }, [dataRef, item.type, category.value]);

    
    
    return (
        
        <ExternalContainer>
            <TitleText>Categoria {categoryChoosed}</TitleText>
            
            {
                screenChosed == '+' ? <UltimasReceitas date={isoDate} category={categoryChoosed}></UltimasReceitas> : <UltimasDespesas date={isoDate} category={categoryChoosed}></UltimasDespesas>
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