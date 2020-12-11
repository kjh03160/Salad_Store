import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import OrderAPI from '../api/orderAPI'
import { useState } from 'react'
import  styled ,{css}from 'styled-components'
import {useAsync} from 'react-async'
import Dialog from '../component/Dialog'
import OrderNumCheck from '../component/OrderNumCheck'
const ForCenter = styled.section`
display:flex;
justify-content:center;
align-items:center;
width:100vw;
height:100vh;
font-family: 'Do Hyeon', sans-serif;

`
const Wrapper = styled.section`
width:1300px;
height:700px;
display:flex;
flex-wrap:wrap;
box-shadow: 4px 4px 4px 6px rgba(50, 50, 93, 0.11),4px 4px 1px 3px rgba(0, 0, 0, 0.08);

`
const SplitedSection = styled.section`
  width:50%;
  height:90%;
  display:flex;
  flex-wrap:wrap;
  align-content:flex-start;
  overflow-y:scroll; 
  h1{
    width:100%;
    height:140px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:5rem;
    background-color:black;
    color:white;
    
    
  }
  .completedRest{
    width:50%;
    height:80px;
    font-size:3rem;
    display:flex;
    justify-content:center;
    align-items:center;
  }

`
const Footer = styled.div`
width:100%;
height:10%;
background-color:black;
color:white;
font-size: 3rem;
display:flex;
justify-content:center;
align-items:center;

`
const Completed = styled.div`
width:100%;
height:120px;
font-size:4rem;
display:flex;
justify-content:center;
align-items:center;
background-color:blue;
color:white;
`
const fetchData = async () =>{
  const response = await OrderAPI.getOrders()
  return response
}

// 게속 확인 할 수 있게 3초에 한번 재렌더링
export default React.memo(function PickUp(){
  let {data, error, isLoading,reload} = useAsync({
    promiseFn:fetchData
  })
  const [visible, setVisible ] = useState(true)
  const [forRender, setForRender] = useState(false)
  useEffect(()=>{
    setTimeout(()=>setVisible(false),3000)
    const timer = setInterval(()=>setForRender(!forRender),3000)
    reload()
    return ()=> clearInterval(timer)
    
  },[forRender])
    
    if (isLoading) return null
    if(error){
      data = {data:{orderList:[]}}
      console.log(data)
    }
    return(
        // 날짜 범위 설정해서 보여줘야함
    <ForCenter>
      <Wrapper>
        <SplitedSection>
          <h1>조리중</h1>
        {data.data.orderList.map((order)=>
        {if (order.completed == false)
          return(<div className="completedRest" key = {order.orderPk}>{order.orderPk}번 주문</div>)
        })}
        </SplitedSection>
        <SplitedSection>
          <h1>조리 완료</h1>
          {data.data.orderList.filter((order)=>
            (order.completed == 1)).map((order,index)=>
            {
              if(index==0)return(<Completed key = {order.orderPk}>{order.orderPk}번 주문</Completed>)
            })
        }
              {data.data.orderList.map((order,index)=>
            {if (order.completed == 1 && index!=0)
              return(<div className="completedRest" key = {order.orderPk}>{order.orderPk}번 주문</div>)
            })
        }
        </SplitedSection>
      <Footer>영수증 상단의 번호를 확인해주세요!</Footer>
      </Wrapper>
    </ForCenter>
    )
})