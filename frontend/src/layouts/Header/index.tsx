import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/svgs/gamdom-logo.svg';
import profile from '../../assets/svgs/profile-circle.svg';
import {
  HeaderWrapper,
  Login,
  LoginGroup,
  Logo,
  ProfileItem,
  Register,
  UserInfo,
  UserProfileContent,
} from './styled';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { useNavigate } from 'react-router-dom';

export const HeaderLayout = () => {
  const navigate = useNavigate();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleOpenProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  const userInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userInfoRef.current &&
        !userInfoRef.current.contains(event.target as Node)
      ) {
        setIsOpenProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const openRegisterModal = () => setIsRegisterModalOpen(true);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    navigate('/');
  };

  return (
    <>
      <HeaderWrapper>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        {!isLogin ? (
          <LoginGroup>
            <Register onClick={openRegisterModal}>Register</Register>
            <Login onClick={openLoginModal}>Login</Login>
          </LoginGroup>
        ) : (
          <UserInfo ref={userInfoRef}>
            <span onClick={handleOpenProfile}>
              <img src={profile} alt="user" />
            </span>
            <UserProfileContent $isOpen={isOpenProfile}>
              <ProfileItem onClick={logoutHandler}>Logout</ProfileItem>
            </UserProfileContent>
          </UserInfo>
        )}
      </HeaderWrapper>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        setIsLogin={setIsLogin}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
};
