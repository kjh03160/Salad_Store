import React, {useEffect} from 'react';
import styled from 'styled-components';
import {darken, lighten} from 'polished'
import useAsync from 'react-async'
import OrderAPI from'../api/orderAPI'
import { Redirect, useHistory } from 'react-router-dom';

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content:center;
  align-items:center;
  /* 크기 */
  height: 2.25rem;
  font-size: 1rem;
  

  /* 색상 */
  background: skyblue;
  &:hover {
    background: ${lighten(0.01), "228be6"};
  }
  &:active {
    background: ${darken(0.5), "228be6"};
  }

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`;



const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
`;

const DialogBlock = styled.div`
  transform: scale(1.00);
  transition:all 0.5s linear;
  width: 500px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  display:flex;
  flex-flow:column wrap;
  justify-content:center;
  align-items:center;
  h3 {
    margin: 0;
    font-size: 3rem;
    padding:10px;
  }
  p{
    display:block;
    font-size:6rem;
  }
`;




function OrderNumCheck({ title, children, confirmText, cancelText,onConfirm, onCancel, visible }) {
  const history = useHistory()
  useEffect(()=>
    {setTimeout(()=>history.push('/pickup'),5000)
  return 
},[])
  if (!visible) return null;
  return (
    <DarkBackground>
      <DialogBlock>
        <h3>{title}</h3>
        <p>{children}</p>
      </DialogBlock>
    </DarkBackground>
  );
}


export default OrderNumCheck;