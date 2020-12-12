import React, {useRef, useState,useEffect} from 'react'
import {useAsync} from 'react-async'
import { useDispatch, useSelector } from 'react-redux'
import { Route,Link } from 'react-router-dom'

import axios from 'axios'
import MenuAPI from '../api/saveData'
import OrderAPI from '../api/orderAPI'



import {qunatityDecrement, qunatityIncrement, setOrder,deleteOption,deleteOrder, cancelOrder} from '../module/order'
import { setSuccess, setLoading, getData } from '../module/dataSet'

import OrderNumCheck from '../component/OrderNumCheck'
import Option from '../component/Option'
import Menu from '../component/Menu'
import OrderList from '../component/OrderList'
import Dialog from '../component/Dialog'
import Payment from '../component/Payment'

import styled,{createGlobalStyle} from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';


const ForCenter = styled.div`
display:flex;
justify-content:center;
align-items: center;
font-family: 'Do Hyeon', sans-serif;
`
const WrapperSection = styled.section`
width:1200px;
height:100vh;
display:flex;
flex-wrap: wrap;
position:relative;

`
const CategorySection =styled.div`
width:15%;
height:70%;
display: flex;
flex-direction: column;
justify-content:flex-start;
align-items: center;
margin:auto;
overflow-y:scroll-behavior;
/* box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); */
a{
  color:white;
  width:100%;
  height:70px;
  font-size: 2.3rem;
  margin-bottom:10px;
  transition:all 0.5s linear;
  div{
  width:100%;
  height:70px;
  display: flex;
  justify-content:center;
  align-items: center;
  background-color:skyblue;
  border-radius:5px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  &:hover {
    transform: scale(1.10);
        }
      }
  }
`
const MenuSection = styled.div`
width: 80%;
height:70%;
display: flex;  
flex-wrap: wrap;
overflow-y: scroll;
margin:auto;
box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`
const OrderListSection = styled.div`
width:97%;
height:25%;
overflow-y: scroll;
margin:auto;


display:flex;
flex-direction:column;
box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
.nav{
  width:1164px;
  height:40px;
  position:fixed;
  background-color:lightgray;
  display:flex;
  align-items:center;
  padding-left: 10px;
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.orderContent{
  margin-top: 40px;
  width:100%;
  display: flex;
  flex-direction:column; 
  justify-content:flex-start;
  flex: 1 1 auto;
}
`
const ForComplete = styled.div`
position:absolute;
right:30px;
bottom:15px;
`
const Test = styled.div`
    margin-top:5px;
    display:flex;
    justify-content:flex-end;
h3{
    display:inline-flex;
    justify-content:center;
    align-items:center;
    font-size:1.3rem;
    margin-right:0.5rem;
}

`
const OrderCompleteButton = styled.button`
    display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  background-color:black;
  font-weight: bold;
  cursor: pointer;
  
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  margin-right: 0.5rem;
  justify-content:center;
  align-items:center;
  /* 크기 */
  height: 2rem;
  font-size: 1rem;
`
// 컨테이너에서 상태, 데이터 다 관리하고 컴포넌트에 뿌려주기
export default function MenuContainer(props) {
    const {dataSet:{loading,data,error}, selectedMenu} = useSelector(state =>({
        dataSet:state.dataSet,
        selectedMenu:state.order
    }))
    // 한 단위의 장바구니
    const [orderList, setOrderList] = useState({})
    const [orderData, setOrderData] = useState([])
    // 주문 완료 팝업
    const [dialog, setDialog] = useState({
        check:false,
        card:false,
        orderNum:false,
    })
    // 주문 완료 버튼 눌렀을시 비어있는경우 alert
    function handleCompleteButton(){
      console.log(selectedMenu)
      if (selectedMenu.length == 0){
        alert('장바구니에 한개 이상의 상품을 넣어주세요')
      }
      else{
        setDialog({check:true,card:false,orderNum:false})
      }
    }

    // 총 금액 
    let cashAmount = 0
    selectedMenu.forEach((item)=> {
        cashAmount += item.mainPrice * item.mainQuantity
        item.optionList.forEach((option)=> cashAmount += (option.optionPrice * item.mainQuantity))   
    })
    
    // order당 구분 위한 ID (나중에 수량변경, 삭제 위해서 고유 id 부여)
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
    const onCancelOrder = () =>dispatch(cancelOrder())
    
    // 메뉴 데이터 api 
    const fetchData = async () =>{
        onSetLoading()
        const response = await MenuAPI.getAll()
        const responseOrder = await OrderAPI.getOrders()
        setOrderData(responseOrder)
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
    const orderComData = {onDeleteOrder, onDeleteOption,onQuantityDecrement,onQuantityIncrement, selectedMenu,cashAmount,setDialog,onCancelOrder}
    if(loading) return <CircularProgress color="black"/>
    if(error)return <div>메뉴를 추가해주세요</div>
    if (orderData == undefined) return null
    return (
        <ForCenter>
          <WrapperSection>
              <CategorySection>
                  {data.category.map((item,index)=>
                  (<Link style ={{textDecoration:"none"}} to ={`/menu/${item.categoryPk}`} key = {index} ><div>{item.categoryName}</div></Link>
                  ))}
              </CategorySection>
              <MenuSection>
                  <Route exact path='/menu/:categoryPk' render={(props)=><Menu {...props} data = {menuComData}/>}/>
                  <Route path='/menu/:categoryPk/:selectedMain' render={(props)=><Option {...props} data = {optionComData}/>}/>
              </MenuSection>
              <OrderListSection>
                <div className="nav">
                  주문 내역
                  </div>
                <div className="orderContent">
                  <OrderList data ={orderComData} />
                </div>

              </OrderListSection>
              <ForComplete>
                  <Test className="orderContentButton">
                      <h3>총금액: {cashAmount}</h3>
                      <OrderCompleteButton onClick = {handleCompleteButton}>주문완료</OrderCompleteButton>  
                      <Link to = ''><OrderCompleteButton onClick = {()=> onCancelOrder()}>주문취소</OrderCompleteButton>  </Link>
                  </Test>
                </ForComplete>
          </WrapperSection>
          <Dialog children ={`총 금액 : ${cashAmount}`} title= "주문 하시겠습니까?"  visible = {dialog.check} onCancel={()=> setDialog({check:false,card:false})} onConfirm={()=>{return setDialog({check:false,card:true}),sendData()}} />
          <Payment children = "카드를 넣어주세요" visible = {dialog.card} data= {data} setVisible={()=>setDialog({check:false, card:false, orderNum:true})}/>
          <Route path={`/menu/:categoryPk/orderNum`} render={()=><OrderNumCheck  {...props} children = {`${orderData.data.orderList[orderData.data.orderList.length-1].orderPk}`} title = "번호를 확인해주세요!" visible = {true} />} />
        </ForCenter>
    )
}


