import React, {useRef, useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route,Link, StaticRouter } from 'react-router-dom'
import axios from 'axios'
import api from '../api/saveData'


import wholeData from '../module/data'
import {qunatityDecrement, qunatityIncrement, setOrder,deleteOption,deleteOrder} from '../module/order'
import { setSuccess, setLoading, getData } from '../module/dataSet'
import apiCallGet from '../api/useApiCallGet'

import Option from '../component/Option'
import Menu from '../component/Menu'
import OrderList from '../component/OrderList'


import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const WrapperSection = styled.section`
    width:1200px;
    height:100vh;
    border:1px solid black;
    display:flex;
    flex-wrap: wrap;
    
    `;
    const CategorySection =styled.div`
    width:15%;
    height:80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin:auto;
    border:1px solid black;
    `
    const MenuSection = styled.div`
    width: 80%;
    height:80%;
    display: flex;  
    flex-wrap: wrap;
    border:1px solid black;
    overflow-y: scroll;
    margin:auto;
    `
    const OrderListSection = styled.div`
    width:97%;
    height:15%;
    border:1px solid black;
    overflow-y: scroll;
    margin:auto;
    `

// 컨테이너에서 상태, 데이터 다 관리하고 컴포넌트에 뿌려주기
export default function MenuContainer(props) {
    const {dataSet:{loading,data,error}, selectedMenu} = useSelector(state =>({
        dataSet:state.dataSet,
        selectedMenu:state.order
    }))
    // 한 단위의 장바구니
    const [orderList, setOrderList] = useState({})
    
    // order당 구분 위한 ID (나중에 수량변경, 삭제 위해서)
    const nextId = useRef(0)
    
    //리덕스 관련 
    const dispatch = useDispatch()
    const onSetOrder = (menuChosen) =>dispatch(setOrder(menuChosen))
    const onSetSuccess = (data) => dispatch(setSuccess(data))
    const onSetLoading = () => dispatch(setLoading())
    const onQuantityIncrement = (orderId) => dispatch(qunatityIncrement(orderId))
    const onQuantityDecrement = (orderId) => dispatch(qunatityDecrement(orderId))
    const onDeleteOption = (orderId,optionId) => dispatch(deleteOption(orderId,optionId))
    const onDeleteOrder = (orderId) => dispatch(deleteOrder(orderId))
    //api 데이터 받아오기
    let menuData = wholeData        // 더미
    useEffect(()=>{
        const fetchData = async () =>{
            onSetLoading()
            const response = await api.getMain()
            onSetSuccess(response.data.data)
        }
        fetchData()
        
    }
    , [])

    //컴포넌트에 넘겨줄 패키지들
    const menuComData = {nextId, menuData, orderList ,setOrderList, onSetOrder,data}
    const optionComData = {nextId, menuData,orderList,setOrderList, onSetOrder}
    const orderComData = {onDeleteOrder, onDeleteOption,onQuantityDecrement,onQuantityIncrement, selectedMenu}

    if(loading) return <CircularProgress color="black"/>
    return (
        
        
        <WrapperSection>
            <CategorySection>
                {menuData.categoryPk.map((item,index)=>
                (<Link style ={{textDecoration:"none",}} to ={`/menu/${item.id}`} key = {index} >{item.name}</Link>
                ))}
            </CategorySection>
            <MenuSection>
                <Route exact path='/menu/:categoryPk' render={(props)=><Menu {...props} data = {menuComData}/>}/>
                <Route path='/  menu/:categoryPk/:selectedMain' render={(props)=><Option {...props} data = {optionComData}/>}/>
            </MenuSection>
            <OrderListSection>
                <OrderList data ={orderComData} />
                {data.map((item)=> <div>{item.categoryName}</div>)}
                </OrderListSection>

        </WrapperSection>
    )
}


