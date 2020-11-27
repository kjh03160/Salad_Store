import React from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { Switch,Route,Link } from 'react-router-dom';

import api from './api/saveData'
import MenuPage from './pages/MenuPage'
import Home from './pages/Home'
import Login from './pages/Login'
import Error from './pages/Error'
import Kitchen from './pages/Kitchen'
import Admin from './pages/Admin'

function App() {
  
  return (
    
    <>
      <Switch>
        {/* <Route exact path='/' component ={Home}/> */}
        <Route exact path='/' component={Login}/>
        <Route  path='/menu' component = {MenuPage}/>
        <Route  path='/kitchen' component = {Kitchen}/>
        <Route path ='/admin' component={Admin}/>
        <Route component={Error}/>
      </Switch>
    </>
      
      
      
      
      
    
  );
}

export default App;
