import { WrapperContent, Container, ConcludeButton, ConcludeText, ContentText } from "./styles";
import check from "../../../public/check.svg";
import Image from "next/image";
import { Title } from "../styles";

interface Props {
  onClick: () => void;
  date: string,
  time: string,
  quantityPokemons: number | undefined,
}

export const Success = (props: Props) => {
  return (
    <Container>
      <WrapperContent>
        <Title>Consulta Agendada</Title>
        <Image src={check} alt="check" />
        <ContentText>Seu agendamento para dia {props.date}, às {props.time}, para {props.quantityPokemons} pokémon{props.quantityPokemons && props.quantityPokemons > 1  && "s" } foi realizado com sucesso!</ContentText>
        <ConcludeButton type="reset" onClick={props.onClick}>
          <ConcludeText>Fazer Novo Agendamento</ConcludeText>
        </ConcludeButton>
      </WrapperContent>
    </Container>
  );
};
