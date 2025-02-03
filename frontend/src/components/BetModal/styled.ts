import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000066;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  form {
    display: flex;
    flex-direction: column;
    background: #181e26;
    padding: 20px;
    width: 180px;
    height: 65px;
    position: relative;
    gap: 20px;
    align-items: center;
    border-radius: 5px;
  }
`;

export const FormGroup = styled.div`
  justify-content: center;
  gap: 10px;
  align-items: center;
  display: flex;
`;

export const BetInput = styled.input`
  width: 75px;
  height: 25px;
  padding: 0 5px;
  border: 2px solid #30363d;
  background-color: transparent;
  outline: none;
  color: #c6c6c6;
  border-radius: 5px;
  text-align: right;
  margin: 0px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
export const BetButton = styled.button`
  height: 25px;
  border-radius: 5px;
  width: 56px;
  color: #c6c6c6;
  cursor: pointer;
  border: 2px solid #30363d;
  background-color: #30363d;
`;

export const EarnContent = styled.p`
  color: white;
  margin: 0px;
`;
