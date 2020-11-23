import React, { useState } from 'react';
import api from '../api/userAPI.js';

export default function Login(){
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [key, setKey] = useState()
    const checkUser = async () => {
        // console.log(key)
        let result = await api.checkUser(key);
        // console.log(result.headers)
        console.log(`cookie: ${document.cookie}`)
    } 

    const loginUser = async () => {
        let result = await api.loginUser({"usr_id" : userId, "password" :  userPw});
        setKey(result.data)
        // console.log(result);
    }
    const setId = (e) => {
        setUserId(e.target.value);
    }

    const setPw = (e) => {
        setUserPw(e.target.value);
    }
    console.log(key)
    return (
        <>
            {/* {{user}} */}
            <input type="text" id="userId" placeholder=" 아이디" onChange={setId} />
            <input type="button" value="로그인" onClick={loginUser} /><br />
            <input type="button" value="로그인 확인" onClick={checkUser} /><br />
            <input type="text" id="userPw" placeholder=" 비밀번호" onChange={setPw} />
            {/* <input type="button" value="로그아웃" onClick={logoutUser} style={{width: '7%', height: '5vw', float: 'right', marginTop: '1.3vw', marginRight: '72%', border: '0.01vw solid #dddcdc'}} /> */}
        </>
    )
}