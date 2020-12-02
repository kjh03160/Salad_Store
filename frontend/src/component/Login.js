import React, {useState} from 'react'
import { Link, Route, Switch,Redirect } from 'react-router-dom'
import Menu from './Menu'
import signIn from '../module/AuthCheck'
import AuthRoute from '../Router/AuthRoute'
import Home from '../pages/Home'

import {useSelector, useDispatch} from 'react-redux'


export default function Login({email, password, user,onSetAuthenticated, onSetDiff, authenticated}){
    const onChange =e =>{
        // console.log(e.target.name, e.target.value)
        // console.log(email,password)
        onSetDiff(e.target.name,e.target.value)
    }
    const handleClick =()=>{
        try{
            login({email,password})
            
            
        }catch(e){
            alert("failed to login");
            onSetDiff('email' , '')
            onSetDiff('password' , '')

        }
    }
    // console.log('로그인직전 ', authenticated,user)
    const login = ({email,password}) =>onSetAuthenticated(signIn(email,password))
    

    
    return(
        <>
        {(authenticated ===false)?
        (<>
        <h1>Login</h1>
            <input
            name = "email"
            value={email}
            onChange={onChange}
            type='text'
            placeholder='email'
            />
            <input
            name="password"
            value={password}
            onChange={onChange}
            type='text'
            placeholder='password'
            />
            <button onClick={handleClick}>로그인</button>
            </>):
            (<div>logout</div>)}
        </>
    )
}
 


// export default function LogIn(){
    
//     const [user,setUser] = useState(null);
//     const [email, setEmail] = useState("")
//     const [password,setPassword] = useState('')
//     const authenticated = user!=null;
//     console.log(authenticated)
//     const handleClick = ()=> {
//         try{
//             login({email, password})
//         }catch(e){
//             alert('nope')
//             setEmail('')
//             setPassword('')
//         }
//     }

//     const login = ({email,password})=>setUser(signIn({email,password}))
//     const logout = () =>setUser(null)
//     if (authenticated) return(<Redirect to={{pathname:'menu'}}/>)
//     return(
//         <>
//         <h1>Login</h1>
//             <input
//             value={email}
//             onChange={({target:{value}})=>setEmail(value)}
//             type='text'
//             placeholder='email'
//             />
//             <input
//             value={password}
//             onChange={({target:{value}})=>setPassword(value)}
//             type='text'
//             placeholder='password'
//             />
//             <button onClick={handleClick}>로그인</button>
//        <Switch>
//            <AuthRoute authenticated= {authenticated} path='/login' render={props => <Home user={user} {...props} />}/>
//        </Switch>
//       </>
//     )
// }