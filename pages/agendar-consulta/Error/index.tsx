import { WrapperContent, Container, ConcludeButton, ConcludeText, ContentText } from "./styles";
import warning from "../../../public/warning.svg";
import Image from "next/image";
import { Title } from "../styles";

interface Props {
  onClick: () => void,
  errorMessage: (string | undefined)[],
}

export const Error = (props: Props) => {
  return (
    <Container>
      <WrapperContent>
        <Title>Houve um problema no agendamento</Title>
        <Image src={warning} alt="check" />
          {props.errorMessage.filter(error => error).map((error, index) => <ContentText key={index}>{`{ ${error} }`}</ContentText>)}
        <ConcludeButton type="reset" onClick={props.onClick}>
          <ConcludeText>Fazer Novo Agendamento</ConcludeText>
        </ConcludeButton>
      </WrapperContent>
    </Container>
  );
};
