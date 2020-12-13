import React from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { Switch,Route,Link } from 'react-router-dom';

import api from './api/saveData'
import MenuPage from './pages/MenuPage'
import PickUp from './pages/PickUp'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Error from './pages/Error'
import Kitchen from './pages/Kitchen'
import Admin from './pages/Admin'

function App() {
  
  return (
    
    <>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route  path='/menu' component = {MenuPage}/>
        <Route  path='/kitchen' component = {Kitchen}/>
        <Route path ='/admin' component={Admin}/>
        <Route path = '/pickup' component = {PickUp}/>
        <Route component={Error}/>
      </Switch>
    </>
      
      
      
      
      
    
  );
}

export default App;
