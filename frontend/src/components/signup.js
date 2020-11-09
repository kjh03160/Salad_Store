import React, { useState } from 'react';
import api from '../api/userAPI.js';

export default function Signup(){
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    
    const signupUser = async () => {
        
        let result = await api.signupUser({"usr_id" : userId, "password" :  userPw});
        console.log(result);
    }

    const setId = (e) => {
        setUserId(e.target.value);
    }

    const setPw = (e) => {
        setUserPw(e.target.value);
    }
    
    return (
        <>
            <input type="text" id="userId" placeholder=" 아이디" onChange={setId} />
            <input type="button" value="회원가입" onClick={signupUser} /><br />
            <input type="text" id="userPw" placeholder=" 비밀번호" onChange={setPw} />
            {/* <input type="button" value="로그아웃" onClick={logoutUser} style={{width: '7%', height: '5vw', float: 'right', marginTop: '1.3vw', marginRight: '72%', border: '0.01vw solid #dddcdc'}} /> */}
        </>
    )
}