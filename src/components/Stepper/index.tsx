import { Button, Container, IconText, Label, ValueContainer } from "./Styles";



export default function Stepper({ value, onUpdate, min, max }) {
  
  const handleDecrement = () => {
    if (min !== undefined && value <= min) return;
    onUpdate(value - 1);
  };

  const handleIncrement = () => {
    if (max !== undefined && value >= max) return;
    onUpdate(value + 1);
  };

  return (
    <Container>
      {/* Botão de Menos */}
      <Button 
        onPress={handleDecrement}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#ffebee' : 'transparent'
        })}
      >
        <IconText color="#E56B70">−</IconText>
      </Button>

      {/* Valor Central */}
      <ValueContainer>
        <Label>{value}</Label>
      </ValueContainer>

      {/* Botão de Mais */}
      <Button 
        onPress={handleIncrement}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#e0f2f1' : 'transparent'
        })}
      >
        <IconText color="#066e74">+</IconText>
      </Button>
    </Container>
  );
}