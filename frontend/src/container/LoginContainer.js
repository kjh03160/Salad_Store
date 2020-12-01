import React from 'react';

import {useSelector, useDispatch} from 'react-redux'
import Login from '../component/Login'
import {setDiff, setAuthenticated} from '../module/auth'
import {Redirect} from 'react-router-dom'


export default function LoginContainer(){
    
    const {email, password, user,authenticated} = useSelector(state =>({
        email: state.auth.email,
        password:state.auth.password,
        authenticated:state.auth.authenticated,
        user:state.auth.user
    }))
    
    const dispatch = useDispatch()
    const onSetDiff = (name,change) => dispatch(setDiff(name,change))
    const onSetAuthenticated = (change)=>dispatch(setAuthenticated(change))
    
    if(authenticated && user==='admin') return(<Redirect to={{pathname:'/admin'}}/>)
    if(authenticated && user==='kitchen') return(<Redirect to={{pathname:'/kitchen'}}/>)
    if (authenticated) return(<Redirect to={{pathname:'/menu/1'}}/>)
    return(
        (authenticated === false)?
        (<Login 
        email={email}
        password={password}
        user={user}
        onSetAuthenticated={onSetAuthenticated}
        onSetDiff={onSetDiff}
        authenticated={authenticated}
        />):(
            <div>이미로그인이얌</div>
        )
    )
}
