import { Container, Description, PagePath, PagePathWrapper, PageTitle } from "./styles";

interface Props {
  title: string;
  description: string;
}

export const InfoPage = (props: Props) => {
  return (
    <Container>
      <div style={{paddingLeft: 106}}>
        <PagePathWrapper>
          <PagePath>Home</PagePath>
          <PagePath style={{fontWeight: 300}}>{">"}</PagePath>
          <PagePath>{props.title}</PagePath>
        </PagePathWrapper>
        <PageTitle>{props.title}</PageTitle>
        <Description>{props.description}</Description>
      </div>
    </Container>
  );
};
