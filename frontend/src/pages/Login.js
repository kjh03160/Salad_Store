import React from 'react'
import {Link} from 'react-router-dom'

import '../App.css';
import logo from '../logo.svg';

import LoginContainer from '../container/LoginContainer'



export default function Login() {
    return (
        
        <div className="App">
      <header className="App-header">
      

        <LoginContainer/>
      </header>
    </div>
    )
}
