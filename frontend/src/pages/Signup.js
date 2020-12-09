import React, { useState, useEffect } from 'react'
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
`

const Desc = styled.div`
  color: grey;
  margin-top: 1vw;
  margin-bottom: 1vw;
`

export default function Login() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [isStaff, setIsStaff] = useState(false);
    
    const signupUser = async () => {
        
        let result = await api.signupUser({"usrId" : userId, "password" :  userPw, "isStaff" : isStaff});
        console.log(result);
    }

    const setId = (e) => {
        setUserId(e.target.value);
    }

    const setPw = (e) => {
        setUserPw(e.target.value);
    }

    const setStaff = (e) => {
        // console.log(e.target.checked);
        setIsStaff(e.target.checked);
    }

    return (
    <div className="App">
      <header className="App-header">
        <Wrapper>
          <Title>MAKE SALAD</Title>
            <LoginForm type="text" id="userId" placeholder=" 아이디" onChange={setId} />
            <LoginForm type="text" id="userPw" placeholder=" 비밀번호" onChange={setPw} />
            <Desc>Make Salad 직원이신가요? <input type="checkbox" onChange={setStaff} /></Desc>
            <LoginForm type="button" value="회원가입" onClick={signupUser} inputColor="#dcdcdc" inputMargin="1vw" inputBorder="none" />
        </Wrapper>
      </header>
    </div>
    )
}
