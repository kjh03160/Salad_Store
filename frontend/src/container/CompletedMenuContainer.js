
import React from 'react'
import {useAsync} from 'react-async'

import OrderAPI from '../api/orderAPI'

import { BiCheckSquare } from "react-icons/bi";
import  styled from 'styled-components'


const Wrapper = styled.div`
display:flex;
width: 55%;
height:100%;
border:1px solid black;

`

const OrderSection = styled.section`
width:30%;
height:100%;
display:flex;
flex-direction:column;
overflow-y:scroll;
`
const Orders = styled.div`
span{
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
}
width:100%;
height:50px;
display:flex;
border:1px solid black;
cursor: pointer;
`
const DetailWrapper = styled.section`
  width:70%;
  height:100%;
  overflow-y:scroll;
`

function DetailSection(props) {
  const { children, value, index, detail,...other } = props;
  if (value !== index)return null
  return (
    <DetailWrapper >
    {value === index && (
      <>
        <div >주문번호 : {detail.orderPk}</div>
        <div>
          {detail.menus.map((menu,index)=>
            (<div key ={index}>
              {menu.menuName}
              {menu.options.map((options,index)=><div key ={index}>{options}</div>)}
              <div key = {index}>{menu.quantity}개</div>
            </div>)
          )}
        </div>
      </>
    )}
    </DetailWrapper>
  );
}
async function getOrder(){
  const response = await OrderAPI.getOrders()
  console.log(response.data)
  return response.data
}


export default function CompletedMenuContainer() {
  
  const {data, error, isLoading,reload} = useAsync({
    promiseFn:getOrder
  })
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  async function handleDone (orderPk){
    const response  = await OrderAPI.setComplete(orderPk)
    reload()
    return response
  }
  if(isLoading) return <div>loading</div>
  return (
    <Wrapper>
      <OrderSection>
        {data.orderList.map((order,index)=>{
          if (order.completed === false) 
          return (
                  <>
                  <Orders key ={order.orderPk} onClick={(event)=>handleChange(event,order.orderPk)} value={order.orderPk} >
                    <span key ={index}>
                      {`${order.orderPk}번 주문`}
                    </span>
                    <BiCheckSquare style={{color:"red",width:"35px",height:"35px"}} onClick={(event)=>handleDone(order.orderPk)}/>
                  </Orders> 
                  
                  </>
                  )     
          })}
      </OrderSection>
      {data.orderList.map((order)=><DetailSection value={value} key={order.orderPk} detail ={order}/>)}
      
    </Wrapper>
  );
  
}

