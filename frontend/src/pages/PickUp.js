import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import OrderAPI from '../api/orderAPI'
import { useState } from 'react'
import  styled ,{css}from 'styled-components'
import {useAsync} from 'react-async'

const Wrapper = styled.section`
width:1300px;
height:100vh;
border:1px solid black;
display:flex;
div{
  width:50%;
  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  overflow-y:scroll; 
  
  
}
`
const fetchData = async () =>{
  const response = await OrderAPI.getOrders()
  console.log(response.data)
  return response
}

// 게속 확인 할 수 있게 3초에 한번 재렌더링
export default function PickUp(){
  let {data, error, isLoading,reload} = useAsync({
    promiseFn:fetchData
  })
  const [forRender, setForRender] = useState(false)
  useEffect(()=>{
    const timer = setInterval(()=>setForRender(!forRender),3000)
    reload()
    return ()=> clearInterval(timer)
    
  },[forRender])
  
    
    if (isLoading) return <div>로딩중...</div>
    if(error){
      data = {data:{orderList:[]}}
      console.log(data)
    }
    return(
        // 날짜 범위 설정해서 보여줘야함
      <Wrapper>
        <div>
          <h1>조리중</h1>
        {data.data.orderList.map((order)=>
        {if (order.completed == false)
          return(<div key = {order.orderPk}>{order.orderPk}번 주문</div>)
        })}
        </div>
        <div>
          <h1>조리 완료</h1>
              {data.data.orderList.map((order)=>
            {if (order.completed == true)
              return(<div key = {order.orderPk}>{order.orderPk}번 주문</div>)}
                )}
        </div>
      </Wrapper>

    )
}