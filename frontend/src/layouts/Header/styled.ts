import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #181e26;
  padding: 0 20px;
  height: 50px;
`;

export const Logo = styled.div``;

export const LoginGroup = styled.div`
  display: flex;
  gap: 10px;
  font-size: 13px;
`;

export const Register = styled.button`
  background-color: transparent;
  border: transparent;
  color: #697f76;
  cursor: pointer;
`;

export const Login = styled.button`
  background-color: transparent;
  border: transparent;
  color: #697f76;
  cursor: pointer;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;

  span {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const UserProfileContent = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #c6c6bd;
  border-radius: 3px;
  width: 70px;
  height: 30px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 30%);
  padding: 3px 0;
  display: flex;
  flex-direction: column;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: -15px;
    right: 0px;
    width: 0px;
    height: 0px;
    border: 10px solid #c6c6bd;
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
  }
`;

export const ProfileItem = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  text-align: left;
  &:hover {
    background-color: #c6c6bd;
  }
  text-decoration: none;
  color: #000000;
`;
