import React from 'react';
import ReactDOM from 'react-dom';
import {
  FormAction,
  FormGroup,
  LoginButton,
  ModalContent,
  ModalOverlay,
  Password,
  Username,
} from './styled';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { basicService } from '@/services';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsLogin: (value: boolean) => void;
}

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose, setIsLogin }) => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = handleSubmit(async (data) => {
    const requestData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await basicService.postRequest(
        `/api/v1/auth/login`,
        requestData
      );
      toast.success(response.message ?? 'Login successfully');

      // Save the token in the local storage
      localStorage.setItem('token', response.token);
      setIsLogin(true);
      navigate('/events');
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message ?? 'Failed to login');
    }
    onClose();
  });
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Username>
              <div>
                <label>Email: </label>
                <input
                  type="text"
                  id="email"
                  {...register('email', {
                    required: 'Enail is required.',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email.',
                    },
                  })}
                  placeholder="test@gmail.com"
                />
              </div>
              <p>{formState.errors.email?.message}</p>
            </Username>
            <Password>
              <div>
                <label>Password: </label>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required.',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long.',
                    },
                  })}
                />
              </div>
              <p>{formState.errors.password?.message}</p>
            </Password>
          </FormGroup>
          <FormAction>
            <LoginButton type="submit">Login</LoginButton>
          </FormAction>
        </form>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

export default LoginModal;
