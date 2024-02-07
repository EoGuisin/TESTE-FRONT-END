import { Container, RightsText } from "./styles";

interface Props {
  absolute: boolean;
}

export const Footer = (props: Props) => {
  return (
    <Container style={{ position: props.absolute ? "absolute" : undefined}}>
      <RightsText>
        Todas as marcas e ilustrações utilizadas são de seus resepctivos donos.
      </RightsText>
    </Container>
  );
};
