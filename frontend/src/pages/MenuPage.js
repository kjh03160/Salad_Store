import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import MenuContainer from '../container/MenuContainer'
import PickContainer from '../container/PickContainer'

import '../App.css';
import logo from '../logo.svg';


export default function MenuPage(){
    // 카테고리 데이터 받아와서 카테고리 PK로 라우팅 설정
    const categoryPk = [
      {
        id:1,
        name:'샐러드'
      },
      {
        id:2,
        name:'포케'
      },
      {
        id:3,
        name:'음료수'
      },
    ]
    
    return(
      <>
      <div className='wrapper'>  
      <section className='category_container'>
        {categoryPk.map((item,index)=>(<Link to ={`/menu/${item.id}`} key = {index} >{item.name}</Link>))}
  
      </section>
      <section className="right_container">
        <section className="menu_container">
          <MenuContainer/>
        </section>
        <section className="pick_container">
          <PickContainer/>
        </section>
      </section>
      
      
      
      </div>
      
</>
    )
}