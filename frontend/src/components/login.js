

export default function login(){
    const loginUser = () => {

    }
    
    return (
        <>
            <input type="text" id="userId" placeholder=" 아이디" />
            <input type="button" value="로그인" onClick={loginUser} /><br />
            <input type="text" id="userPw" placeholder=" 비밀번호" />
            {/* <input type="button" value="로그아웃" onClick={logoutUser} style={{width: '7%', height: '5vw', float: 'right', marginTop: '1.3vw', marginRight: '72%', border: '0.01vw solid #dddcdc'}} /> */}
        </>
    )
}