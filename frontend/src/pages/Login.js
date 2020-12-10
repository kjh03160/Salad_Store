import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../api/userAPI.js';
import '../App.css';
import  styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vw;
  color: skyblue;
  justify-content: center;
  align-items: center;
  font-family: 'Do Hyeon', sans-serif;
`
const Title = styled.div`
  font-size: 10vw;
  margin-bottom: 1.5vw;
`

const LoginForm = styled.input`
  height: 4vw;
  width: 25%;
  margin-bottom: 0.5vw;
  background-color: ${props => props.inputColor};
  margin-top: ${props => props.inputMargin};
  border: ${props => props.inputBorder};
  padding-left: 1vw;
`

const OrderBtn = styled.input`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 2.6vw;
  border-radius: 4vw;
  height: 5.5vw;
  width: 17%;
  background-color: "#dcdcdc";
  margin-top: 2vw;
  border: ${props => props.inputBorder};
`

export default function Login() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [authority, setAuthority] = useState();

    const history = useHistory();

    // 로그인된 상태로 페이지에 접속한 유저의 권한 확인
    useEffect(() => {
      const checkUser = async () => {
        const result = await api.checkUser();

        if (result.status === 200){
          setAuthority(result.data.authority);
        }
      };

      checkUser();
      if (authority === 'staff') {
        history.push('/kitchen');
      } else if (authority === 'admin') {
        history.push('/' + authority);
      } 

    }, [authority]);

    // 로그인 버튼 클릭 이벤트 핸들러
    // setState를 하고 rerendering => 유저 권한에 따라 컴포넌트들이 다르게 보여짐
    const loginUser = async () => {
      try {
        let result = await api.loginUser({"usrId": userId, "password":  userPw});
        if (result.status === 200) {
          setAuthority(result.data);
        } 
      } catch(e) {
        alert("아이디 혹은 비밀번호를 잘못 입력하셨습니다.");
        clearInput();
      }
    }
    const setId = (e) => {
        setUserId(e.target.value);
    }

    const setPw = (e) => {
        setUserPw(e.target.value);
    }

    const redirectToOrderPage = () => {
        history.push('/menu') 
    }

    const clearInput = () => {
      const idElem = document.getElementById("userId");
      const pwElem = document.getElementById("userPw");
      idElem.value = '';
      pwElem.value = '';
      idElem.focus();
    }

    return (
        
        <Wrapper>
          <Title>MAKE SALAD</Title>
            {!authority ?
              <>
              <LoginForm type="text" id="userId" placeholder=" 아이디" onChange={setId} inputBorder = "1px solid gray" />
              <LoginForm type="password" id="userPw" placeholder=" 비밀번호" onChange={setPw} inputBorder = "1px solid gray" />
              <LoginForm type="button" value="로그인" onClick={loginUser} inputColor="#dcdcdc" inputMargin="1vw" inputBorder="none" />
              </>
              :
              <OrderBtn type="button" value="주문하기" onClick={redirectToOrderPage} inputBorder="none" />
            }
        </Wrapper>
    )
}
