import { useEffect, useState } from "react";
import { Container, NavSchedule, NavWho, Content } from "./styles";
import pokeball from "../../../public/images/white-pokeball.svg";
import Image from "next/image";
import styled from "styled-components";

interface Props {
  absolute: boolean;
}

export const Header = (props: Props) => {
  const [animation, setAnimation] = useState<boolean>(false);
  const [pokecenter, setPokeCenter] = useState<boolean>(true);

  function Animation() {
    setAnimation(true);
    setPokeCenter(false);
  }
  useEffect(() => {
    setTimeout(Animation, 5000);
  }, []);

  return (
    <Container style={{ position: props.absolute ? "absolute" : undefined }}>
      <Content>
        <PokeWrapper href="/" onMouseOver={() => setPokeCenter(true)} onMouseOut={() => setPokeCenter(false)} $animation={animation.toString()}>
          <Image src={pokeball} style={{ marginLeft: 6 }} alt="pokeball" />
          <PokeCenter $pokecenter={pokecenter.toString()}>
            Centro Pokémon
          </PokeCenter>
        </PokeWrapper>
        <div>
          <NavWho href="/quem-somos">Quem Somos</NavWho>
          <NavSchedule href="/agendar-consulta">Agendar Consulta</NavSchedule>
        </div>
      </Content>
    </Container>
  );
};

const PokeWrapper = styled.a<{ $animation: string }>`
  cursor: pointer;
  background: #e40f0f;
  border-radius: 50px;
  text-decoration: none;
  height: 50px;
  gap: 1.5rem;
  width: ${(props) => (props.$animation === "true" ? "50px" : "250px")};
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  &:hover {
    width: 250px;
  }
`;

const PokeCenter = styled.h1<{ $pokecenter: string }>`
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  color: #FFF;
  transition: all 0.2s ease;
  visibility: ${(props) =>
    props.$pokecenter === "false" ? "hidden" : "visible"};
`;
