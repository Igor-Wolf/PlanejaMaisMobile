import React from "react";
import { View, Text } from "react-native";
import { BarText, ExternalBar, ExternalContainer, InternallBar } from "./Styles";

const ProgressBar = ({ atual, total }) => {
  const porcentagem = Math.min(Math.max((atual / total) * 100, 0), 100);

  return (
    <ExternalContainer style={{ width: "100%", padding: 20 }}>
      {/* Container Externo (Trilho) */}
      <ExternalBar>
        {/* Container Interno (Progresso) */}
        <InternallBar
          style={{
            width: `${porcentagem}%`,
          }}
              >
                  
        </InternallBar>
      <BarText >
        {porcentagem.toFixed(0)}% concluído
      </BarText>
      </ExternalBar>

    </ExternalContainer>
  );
};

export default ProgressBar;
