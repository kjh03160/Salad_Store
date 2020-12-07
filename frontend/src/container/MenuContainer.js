import React, {useRef, useState,useEffect} from 'react'
import {useAsync} from 'react-async'
import { useDispatch, useSelector } from 'react-redux'
import { Route,Link } from 'react-router-dom'

import axios from 'axios'
import MenuAPI from '../api/saveData'
import OrderAPI from '../api/orderAPI'



import {qunatityDecrement, qunatityIncrement, setOrder,deleteOption,deleteOrder} from '../module/order'
import { setSuccess, setLoading, getData } from '../module/dataSet'


import Option from '../component/Option'
import Menu from '../component/Menu'
import OrderList from '../component/OrderList'
import Dialog from '../component/Dialog'
import Payment from '../component/Payment'

import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';

// import { Dialog } from '@material-ui/core'

const ForCenter = styled.div`
display:flex;
justify-content:center;
align-items: center;
`
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
    // 주문 완료 팝업
    const [dialog, setDialog] = useState({
        check:false,
        card:false
    })

    // 총 금액 
    let cashAmount = 0
    selectedMenu.forEach((item)=> {
        cashAmount += item.mainPrice * item.mainQuantity
        item.optionList.forEach((option)=> cashAmount += option.optionPrice)   
    })
    
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
    
    // 메뉴 데이터 api 
    const fetchData = async () =>{
        onSetLoading()
        const response = await MenuAPI.getAll()
        console.log(response.data)
        onSetSuccess(response.data)
    }
    // 주문 api
    const sendData = async ()=> {
        let pack = {
          menus:selectedMenu.map((order)=> 
            ({
              menuId:order.mainId,
              options:order.optionList.map((option)=> option.optionId),
              quantity: order.mainQuantity
            })),
          totalPrice:cashAmount
        };
        const response = await OrderAPI.makeOrders(pack)
        return response

    }
    useEffect(()=>{
        fetchData()
    }
    , [])

    //컴포넌트에 넘겨줄 패키지들
    const menuComData = {nextId,  orderList ,setOrderList, onSetOrder,data}
    const optionComData = {nextId, orderList,setOrderList, onSetOrder,data}
    const orderComData = {onDeleteOrder, onDeleteOption,onQuantityDecrement,onQuantityIncrement, selectedMenu}
    if(loading) return <CircularProgress color="black"/>
    if(error)return <div>메뉴를 추가해주세요</div>
    return (
        
        <ForCenter>
        <WrapperSection>
            <CategorySection>
                {data.category.map((item,index)=>
                (<Link style ={{textDecoration:"none",}} to ={`/menu/${item.categoryPk}`} key = {index} >{item.categoryName}</Link>
                ))}
            </CategorySection>
            <MenuSection>
                <Route exact path='/menu/:categoryPk' render={(props)=><Menu {...props} data = {menuComData}/>}/>
                <Route path='/menu/:categoryPk/:selectedMain' render={(props)=><Option {...props} data = {optionComData}/>}/>
            </MenuSection>
            <OrderListSection>
                <OrderList data ={orderComData} />
                <div>총금액: {cashAmount}</div>
                <button onClick = {()=> setDialog({check:true,card:false})}>주문완료</button>
                </OrderListSection>
            
        </WrapperSection>
        <Dialog children ={cashAmount} title= "주문 하시겠습니까?"  visible = {dialog.check} onCancel={()=> setDialog({check:false,card:false})} onConfirm={()=>{return setDialog({check:false,card:true}),sendData()}} />
        <Payment children = "카드를 넣어주세요" visible = {dialog.card}/>
        </ForCenter>
    )
}


