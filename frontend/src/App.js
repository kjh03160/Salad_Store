
// import './App.css';
// import React from 'react';
// import { BrowserRouter, Route } from "react-router-dom";
// import login from './components/login';
// import signup from './components/signup';

// function App() {
  
//   return (
//     <BrowserRouter>
//       <Route path="/login" component={login}/>
//       <Route path="/signup" component={signup}/>
//     </BrowserRouter>

// import React from 'react';
// import {useSelector,useDispatch} from 'react-redux'
// import {Redirect} from 'react-router-dom'

// import { Switch,Route,Link } from 'react-router-dom';



//   const save = async () => {
    // // e.preventDefault를 왜 안하지?
    // let form = new FormData();
    // // // dictionary 형태로 한번에 담아서 보내기
    // // // console.log(img.name)
    // form.append('category_pk', 14);
    // // form.append('menu_pk',3)
    // form.append('menu_name', 'hf');
    // form.append('menu_price', 30);
    // form.append('menu_soldout', 1);
    // form.append('menu_description', 'zxcvbn');
    // form.append('image',img)
    // for (var key of form.values()){
    //   console.log(key);
    // }
    // let result2 = await api.getMain({'pk':3});
    // let result2 = await api.newMain({'category_pk': 1, 'text1' : usertext1, 'text2' : usertext2, 'image':img});
    // let result2 = await api.newMain(form)
    // let result2 = await api.changeMain(form);
    // let result2 = await api.reviseOption({'option_pk' : 3, 'option_name' : 'cvzas', 'option_price' : 100})
    // let result2 = await api.reviseMain(form);
    // let result2 = await api.addCategory({'name': "cibal"})
    // let result2 = await api.changeCategory({'name': "change", 'pk' : 4})
    // let result2 = await api.getCategory({})
    // let result2 = await api.deleteCategory({'category_pk': 12})
    // let result2 = await api.addOption({'option_name' : '왜와이? 영택?', 'option_price' : 20, 'option_soldout' : 1})
    // let result2 = await api.newLink({'menu_pk' : 4, 'option_pk' : 5})
    // let result2 = await api.addOption({})
    // let result2 = await api.deleteOption({'option_pk' : 6})
    // let result2 = await api.deleteMain({'pk':5});
    // let result2 = await api.deleteLink({'menu_pk' : 4, 'option_pk' : 9})
import React from 'react';
import { BrowserRouter, Route,Switch } from "react-router-dom";
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
