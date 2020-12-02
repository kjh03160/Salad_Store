import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import MenuContainer from '../container/MenuContainer'
import PickContainer from '../component/OrderList'

import '../App.css';
import logo from '../logo.svg';


export default function MenuPage(){
  // 코드 넘 더럽...ㅠ
    return(
      <>
          <MenuContainer/>
      </>
    )
}