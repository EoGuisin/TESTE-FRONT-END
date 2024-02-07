import { CalculationWrapper, Total, ConcludeButton, ConcludeText } from "./styles";

interface Props {
  onClick: () => void,
  total: string,
}

export const CalculationButton = (props: Props) => {
  return (
    <CalculationWrapper style={{marginTop: 24}}>
      <Total>{props.total}</Total>
      <ConcludeButton type="submit" onClick={props.onClick}>
        <ConcludeText>Concluir Agendamento</ConcludeText>
      </ConcludeButton>
    </CalculationWrapper>
  );
};
