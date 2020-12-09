
import React from 'react'
import { useAsync } from 'react-async'

import OrderAPI from '../api/orderAPI'

import { IoRestaurantOutline } from "react-icons/io5";
import styled from 'styled-components'


const Wrapper = styled.div`
display:flex;
width: 85%;
height:100%;
border:1px solid black;

`

const OrderSection = styled.section`
width:30%;
height:100%;
display:flex;
flex-direction:column;
overflow-y:auto;
border:1px solid black;
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #2f3542;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}
::-webkit-scrollbar-track {
  background-color: grey;
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}
`
const Orders = styled.div`
span.orderId{
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  color:white;
  font-size:large
}
width:100%;
height:50px;
display:flex;
border:1px solid black;
cursor: pointer;

background-color: skyblue;
border: 2px solid black;
border-radius: 1px;
`
const DetailWrapper = styled.section`
  width:70%;
  height:100%;
  
  overflow-y:auto;
  border:1px solid black;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
  padding:5% 5%;
  font-size:30px;
  div.orderId{
    font-size: 50px
  }
  div.count{
    text-align:right;
  }
`

const MenuWrapper = styled.section`
  font-size: 30px
`

const OptionWrapper = styled.section`
  text-indent: 3em;
`

function DetailSection(props) {
  const { children, value, index, detail, ...other } = props;
  if (value !== index) return null
  return (
    <DetailWrapper >
      {value === index && (
        <>
          <div class="orderId">주문번호 : {detail.orderPk}</div>
          <div>
            {detail.menus.map((menu, index) =>
              (
                <div key={index}>
                  <MenuWrapper>
                    메뉴{index + 1} : {menu.menuName}<br />
                  </MenuWrapper>
                  {
                    menu.options[0] !== null ?
                      <OptionWrapper>
                        {menu.options.map((options, index) => <div class="option" key={index}>- {options} 추가</div>)}
                      </OptionWrapper> : null
                  }
                  <div class='count' key={index}>수량 : {menu.quantity}개</div>
                  <br />
                </div>
              )
            )}
          </div>
        </>
      )}
    </DetailWrapper>
  );
}
async function getOrder() {
  const response = await OrderAPI.getOrders()
  return response.data
}


export default function CompletedMenuContainer() {
  const { data, error, isLoading, reload } = useAsync({
    promiseFn: getOrder
  })
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  async function handleDone(orderPk) {
    const response = await OrderAPI.setComplete(orderPk)
    reload()
    return response
  }
  if(isLoading) return <div>loading</div>
  if(error){
    data = {orderList:[]}
    console.log(data)
  }

  return (
    <Wrapper>
      <OrderSection>
        {data.orderList.map((order, index) => {
          if (order.completed === false)
            return (
              <>
                <Orders key={order.orderPk} onClick={(event) => handleChange(event, order.orderPk)} value={order.orderPk} >
                  <span class="orderId" key={index}>
                    {`${order.orderPk}번 주문`}
                  </span>
                  <IoRestaurantOutline style={{ color: "#4646CD", width: "35px", height: "35px" }} onClick={(event) => handleDone(order.orderPk)} />
                </Orders>
              </>
            )
        })}
      </OrderSection>
      {data.orderList.map((order) => <DetailSection value={value} index={order.orderPk} detail={order} />)}

    </Wrapper>
  );

}

