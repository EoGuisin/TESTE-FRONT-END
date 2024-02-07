import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4%;
`;

export const Title = styled.h1`
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  color: #1D1D1D;
`;

export const WrapperContent = styled.div`
  width: 408px;
  border-radius: 8px;
  background: linear-gradient(0deg, rgba(223, 134, 134, 0.04), rgba(223, 134, 134, 0.04));
  border: 1px solid #df8686;
  text-align: center;
  align-items: center;
  padding-top: 20px;
`;

export const ContentText = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  margin-inline: 34px;
  color: #747474;
  margin-block: 20px;
`;

export const ConcludeButton = styled.button`
  margin-bottom: 34px;
  cursor: pointer;
  height: 42px;
  border-radius: 30px;
  background-color: #e40f0f;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-width: 0;
  margin-left: auto;
  margin-right: auto;
`;

export const ConcludeText = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
  margin-inline: 10px;
`;
