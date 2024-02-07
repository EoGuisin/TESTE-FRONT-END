import styled from "styled-components";

export const WrapperContent = styled.form`
  margin-top: 32px;
  width: 590px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 567px;
`;

export const Title = styled.h1`
  font-family: Inter;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

export const Names = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
`;

export const InputTitle = styled.h2`
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  margin-left: 1px;
`;

export const Input = styled.input`
  width: 16.5rem;
  height: 2.8rem;
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  padding-left: 14px;
`;

export const Picker = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 2rem;
`;

export const Option = styled.div`
  padding: 10px;
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  color: #747474;
  cursor: pointer;
  &:hover {
    background-color: #faf7f7;
  }
`;

export const Selects = styled.div`
  cursor: pointer;
  width: 278px;
  height: 2.8rem;
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  color: #747474;
  border: 1px solid #d5d5d5;
  display: flex;
  align-items: center;
  border-top-left-radius: 8px;
  border-radius: 8px;
  justify-content: space-between;
`;

export const YourTeamPS = styled.div`
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  color: #747474;
`;

export const YourTeamWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;

export const AddPokemon = styled.div`
  width: 253px;
  height: 42px;
  border-radius: 30px;
  border: 1px solid #1d1d1d;
  color: #1d1d1d;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  margin-top: 2rem;
`;

export const Bar = styled.div`
  width: 100%;
  border: 1px solid #d5d5d5;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
`;

export const CalculationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: #747474;
  align-items: center;
`;

export const CalculationText = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
`;

export const Total = styled.div`
  font-family: Inter;
  font-size: 24px;
  font-weight: 600;
  color: #1d1d1d;
`;

export const ConcludeButton = styled.button`
  cursor: pointer;
  width: 183px;
  height: 42px;
  border-radius: 30px;
  background-color: #e40f0f;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  border-width: 0;
`;

export const ConcludeText = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
`;
