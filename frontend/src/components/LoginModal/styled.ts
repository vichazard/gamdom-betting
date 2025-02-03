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
    background: #181e26;
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    justify-content: center;
    gap: 20px;
    box-sizing: border-box;
    position: relative;
    align-items: center;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const FormAction = styled.div`
  align-self: flex-end;
`;

export const Username = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #c6c6c6;

    input {
      width: 150px;
      height: 24px;
      gap: 10px;
      border-radius: 5px;
      background-color: transparent;
      color: #c6c6c6;
      border: 2px solid #30363d;
      outline: none;
    }
  }

  p {
    color: red;
    font-size: 10px;
    align-self: flex-end;
  }
`;

export const Password = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #c6c6c6;

    input {
      width: 150px;
      height: 24px;
      gap: 10px;
      border-radius: 5px;
      background-color: transparent;
      color: #c6c6c6;
      border: 2px solid #30363d;
      outline: none;
    }
  }

  p {
    color: red;
    font-size: 10px;
    align-self: flex-end;
  }
`;

export const LoginButton = styled.button`
  background-color: #25724e;
  width: 117px;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  box-shadow: 3px 5px 20px 0px #00000040;
  color: #c6c6c6;
  cursor: pointer;
  border: 2px solid #25724e;
`;
