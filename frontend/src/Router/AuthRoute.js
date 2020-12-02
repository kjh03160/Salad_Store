import React from 'react';
import {Redirect, Route} from 'react-router-dom'

export default function AuthRoute ({authenticated, component:Component, hooah, ...rest}){
    return(
        <Route
        {...rest}
        render = {(props)=>
        authenticated ? (
            hooah ? (
                hooah(props)
            ):(
                <Component {...props}/>
            )
        ):(
            <Redirect to ={{pathname:'/login'}}/>
        )
        
        }/>
    )
}