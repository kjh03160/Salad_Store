import React, {useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route,Link } from 'react-router-dom'

import wholeData from '../module/data'
import {setOrder} from '../module/order'

import Option from '../component/Option'
import Menu from '../component/Menu'
import OrderList from '../component/OrderList'

import './menuContainer.css';

export default function MenuContainer(props) {
    // 장바구니
    const [orderList, setOrderList] = useState({
    })
    // order당 구분 위한 ID
    const nextId = useRef(0)
    
    //리덕스 관련 
    const dispatch = useDispatch()
    const onSetOrder = (menuChosen) =>dispatch(setOrder(menuChosen))
    
    // 카테고리,메뉴,옵션 데이터 (api호출 해서 받아오기)
    const menuData = wholeData

    //컴포넌트에 넘겨줄 패키지들
    const menuComData = {nextId, menuData, orderList ,setOrderList, onSetOrder}
    const optionComData = { nextId, menuData,orderList,setOrderList, onSetOrder}
    return (
        <>
        <div className='wrapper'>
        <section className="category">
        {menuData.categoryPk.map((item,index)=>
        (<Link to ={`/menu/${item.id}`} key = {index} >{item.name}</Link>
        ))}
        </section>
        <section className="menuPick">
        <Route exact path='/menu/:categoryPk' render={(props)=><Menu {...props} data = {menuComData}/>}/>
        <Route path='/menu/:categoryPk/:selectedMain' render={(props)=><Option {...props} data = {optionComData}/>}/>
        </section>
        <section className='orderList'>
        <OrderList/>
        </section>
        </div>
        
        
        </>
    )
}
