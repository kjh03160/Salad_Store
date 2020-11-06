import './App.css';
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import login from './components/login';
import signup from './components/signup';

function App() {
  
  return (
    <BrowserRouter>
      <Route path="/login" component={login}/>
      <Route path="/signup" component={signup}/>
    </BrowserRouter>
  );
}

export default App;
