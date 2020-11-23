import React, {useRef, useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route,Link, StaticRouter } from 'react-router-dom'
import axios from 'axios'


import wholeData from '../module/data'
import {setOrder} from '../module/order'
import { setSuccess, setLoading, getData } from '../module/dataSet'

import Option from '../component/Option'
import Menu from '../component/Menu'
import OrderList from '../component/OrderList'

import './menuContainer.css';

// 컨테이너에서 상태, 데이터 다 관리하고 컴포넌트에 뿌려주기
export default function MenuContainer(props) {
    const {dataSet:{loading,data,error}} = useSelector(state =>({
        dataSet:state.dataSet,
    }))
    
    // 장바구니
    const [orderList, setOrderList] = useState({})
    
    // order당 구분 위한 ID (나중에 수량변경, 삭제 위해서)
    const nextId = useRef(0)
    
    //리덕스 관련 
    const dispatch = useDispatch()
    const onSetOrder = (menuChosen) =>dispatch(setOrder(menuChosen))
    const onSetSuccess = (data) => dispatch(setSuccess(data))
    const onSetLoading = () => dispatch(setLoading())
    
    //api 데이터 받아오기
    let menuData = wholeData        // 더미
    useEffect(() => {
        const fetchData = async () =>{
            onSetLoading()
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/users`
            )
            onSetSuccess(response.data)
    }
        fetchData()
    }
    , [])

    //컴포넌트에 넘겨줄 패키지들
    const menuComData = {nextId, menuData, orderList ,setOrderList, onSetOrder}
    const optionComData = { nextId, menuData,orderList,setOrderList, onSetOrder}
    
    if(loading) return <div>로딩중</div>
    return (
        
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
                {/* {data.map((item)=> <div>{item.name}</div>)} */}
            </section>

        </div>
    )
}
