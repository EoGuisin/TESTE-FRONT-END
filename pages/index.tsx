import styled from "styled-components";
import { Header, Footer } from "./components";

export default function Home() {
  return (
    <div>
      <img
        src="/images/pokemon-hero.jpg"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        alt="pokemon"
      />
      <Header absolute={true} />
      <Footer absolute={true} />
      <ContentText>
        Cuidamos bem do seu pokémon,<br /> para ele cuidar bem de você
      </ContentText>
    </div>
  );
}

const ContentText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Inter;
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  color: #FFFFFF;
  text-align: center;
`;