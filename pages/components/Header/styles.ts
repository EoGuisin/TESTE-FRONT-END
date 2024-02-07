import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  height: 6.5rem;
  background: #FFF;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-inline: 5rem;
`;

export const NavWho = styled.a`
  cursor: pointer;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  margin-right: 30px;
  color: #000;
  text-decoration: none;
`;

export const NavSchedule = styled.a`
  cursor: pointer;
  text-decoration: none;
  background: #e40f0f;
  padding-inline: 24px;
  padding-block: 12px;
  border-radius: 30px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
`;
