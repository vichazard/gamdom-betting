import styled from 'styled-components';

export const EventItemContent = styled.div`
  display: flex;
  width: 220px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 10px;
  background-color: #181e26;
  border-radius: 5px;
  color: #697f76;
`;

export const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-align: center;
`;

export const Odds = styled.div`
  display: flex;
  gap: 10px;
  font-size: 13px;
`;

export const Odd = styled.button<{ active: string }>`
  width: 66px;
  height: 34px;
  background-color: ${({ active }) =>
    active === 'active' ? 'rgba(6, 6, 6, 0.27)' : 'rgb(48, 54, 61)'};
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #30363d;
  color: #c6c6c6;
  font-size: 13px;
  font-weight: 400;
  line-height: 15.25px;
  cursor: pointer;
`;

export const Bet = styled.button`
  background-color: #25724e;
  border: transparent;
  cursor: pointer;
  width: 112px;
  height: 25px;
  padding: 5px 10px 5px 10px;
  gap: 10px;
  border-radius: 5px;
  align-content: end;
  color: #c6c6c6;
  align-self: end;
`;
