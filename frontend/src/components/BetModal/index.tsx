import React from 'react';
import ReactDOM from 'react-dom';
import {
  BetButton,
  BetInput,
  EarnContent,
  FormGroup,
  ModalContent,
  ModalOverlay,
} from './styled';
import { useForm } from 'react-hook-form';
import { basicService } from '@/services';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { getBetResult } from '@/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
  oddId: number;
  odd: number;
}

const BetModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  eventId,
  oddId,
  odd,
}) => {
  const { register, handleSubmit, watch } = useForm<{
    value: number;
  }>({
    defaultValues: {
      value: 1,
    },
  });

  const value = watch('value');

  const handleBet = handleSubmit(async (data) => {
    const token = localStorage.getItem('token') ?? '';
    const betResult = getBetResult(oddId);
    const requestData = {
      eventId,
      oddId,
      value: +data.value,
      betResult,
    };
    try {
      const response = await basicService.postRequest(
        `/api/v1/bets`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.message ?? 'Bet successful');
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError?.message ?? 'Failed to bet');
    }
    onClose();
  });

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose} data-testid="modal-overlay">
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-content"
      >
        <form>
          <FormGroup>
            <BetInput
              type="number"
              {...register('value', { required: 'Value is required.' })}
              data-testid="bet-input"
            />
            <BetButton onClick={handleBet} data-testid="bet-button">
              Bet
            </BetButton>
          </FormGroup>
          <EarnContent>You will earn {(odd * value).toFixed(2)}</EarnContent>
        </form>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

export default BetModal;
