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


import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const WrapperSection = styled.section`
    width:1200px;
    height:100vh;
    border:1px solid black;
    display:flex;
    flex-wrap: wrap;
    `;
    const CategorySection =styled.div`
    width:20%;
    height:80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border:1px solid black;
    `
    const MenuSection = styled.div`
    width: 80%;
    height:80%;
    display: flex;  
    flex-wrap: wrap;
    border:1px solid black;
    overflow-y: scroll;
    `
    const OrderListSection = styled.div`
    width:100%;
    height:20%;
    border:1px solid black;
    overflow-y: scroll;
    `

// 컨테이너에서 상태, 데이터 다 관리하고 컴포넌트에 뿌려주기
export default function MenuContainer(props) {
    const {dataSet:{loading,data,error}, selectedMenu} = useSelector(state =>({
        dataSet:state.dataSet,
        selectedMenu:state.order
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
            console.log(response)
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
        
        
        <WrapperSection>
            <CategorySection>
                {menuData.categoryPk.map((item,index)=>
                (<Link to ={`/menu/${item.id}`} key = {index} ><Typography>{item.name}</Typography></Link>
                ))}
            </CategorySection>
            <MenuSection>
                <Route exact path='/menu/:categoryPk' render={(props)=><Menu {...props} data = {menuComData}/>}/>
                <Route path='/menu/:categoryPk/:selectedMain' render={(props)=><Option {...props} data = {optionComData}/>}/>
            </MenuSection>
            <OrderListSection>
                <OrderList selectedMenu = {selectedMenu}/>
                {/* {data.map((item)=> <div>{item.name}</div>)} */}
                </OrderListSection>

        // </WrapperSection>
    )
}


