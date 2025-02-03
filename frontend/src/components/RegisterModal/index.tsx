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
import { useForm } from 'react-hook-form';
import { basicService } from '@/services';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleRegister = handleSubmit(async (data) => {
    const requestData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await basicService.postRequest(
        `/api/v1/auth/register`,
        requestData
      );
      toast.success(response.message ?? 'User created successfully');
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message ?? 'Failed to register the user');
    }
    onClose();
  });

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleRegister}>
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
            <LoginButton type="submit">Register</LoginButton>
          </FormAction>
        </form>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

export default RegisterModal;
