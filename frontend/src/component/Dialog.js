import React from 'react';
import styled from 'styled-components';
import {darken, lighten} from 'polished'


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
  background: rgba(0, 0, 0, 0.8);
`;

const DialogBlock = styled.div`
  transform: scale(1.00);
  transition:all 0.5s linear;
  width: 500px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 2rem;
    padding-top:30px;
  }
  p{
    margin-top:50px;
    font-size:1.3rem;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;
function Button({ children, ...rest }) {
    return <StyledButton {...rest}>{children}</StyledButton>;
  }

function Dialog({ title, children, confirmText, cancelText,onConfirm, onCancel, visible }) {
  if (!visible) return null;
  
  return (
    <DarkBackground>
      <DialogBlock>
        <h3>{title}</h3>
        <p>{children}</p>
        <ButtonGroup>
            <Button  onClick={onConfirm}>{confirmText}</Button>
            <Button  onClick={onCancel}>{cancelText}</Button>      
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}

Dialog.defaultProps = {
  confirmText: '확인',
  cancelText: '취소'
};

export default Dialog;