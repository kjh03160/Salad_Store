
import React from 'react'
import { useSelector,useDispatch} from 'react-redux'
import styled,{createGlobalStyle} from 'styled-components'


const OrderedMain = styled.div `
width:100%;
font-size:1.5rem;
display:flex;
align-items:center;
span{
    color:black;
    }
`
const OrderedOption = styled.div`
width:100%;
height:1.5rem;
padding-left:50px;
font-size:1.3rem;
display:flex;
align-items:center;
span{
    color:black;
    }
`
const QuantityButton = styled.button`
display: inline-flex;
  outline: none;
  border: none;
  color: white;
  background-color:black;
  font-weight: bold;
  cursor: pointer;
  justify-content:center;
  align-items:center;
  margin:0;
  height: 1.5rem;
  width:1.5rem;
  font-size: 1rem;
`
const DeleteButton = styled.button`
    display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  background-color:red;
  font-weight: bold;
  cursor: pointer;
  padding:0.1rem;
  /* margin-right: 0.5rem; */
  justify-content:center;
  align-items:center;
  /* 크기 */
  height: 1.3rem;
  width:1.3rem;
  font-size: 1rem;
`

export default function OrderList(props) {
    const {onDeleteOption,onQuantityDecrement,onQuantityIncrement,selectedMenu,onDeleteOrder,cashAmount,setDialog,onCancelOrder} = props.data

    
    // 메뉴 수량 증가
    const handleIncrement = (orderId) =>{
        onQuantityIncrement(orderId)
    }
    // 메뉴 수량 감소
    const handleDecrement= (orderId) =>{
        onQuantityDecrement(orderId)
    }
    // 옵션 삭제
    const handleDeleteOption = (orderId,optionId,event) =>{     
        onDeleteOption(orderId,optionId)
    }
    // 메뉴 삭제
    const handleDeleteOrder=(orderId)=>{
        onDeleteOrder(orderId)
    }
    
    return (
            
            <>
            {selectedMenu.map((main,index)=> 
                <>
                <OrderedMain key = {index}>
                    <span>{index+1}. {main.main} : {main.mainPrice}원 </span>
                    <QuantityButton onClick={()=>handleIncrement(main.orderId)}>+</QuantityButton>
                    <QuantityButton>{main.mainQuantity} </QuantityButton>
                    <QuantityButton onClick={()=>handleDecrement(main.orderId)}>-</QuantityButton>
                    <DeleteButton onClick={()=>handleDeleteOrder(main.orderId)}>X</DeleteButton>
                </OrderedMain>
                    {main.optionList.map((item,index)=> 
                    (<OrderedOption>
                        <span>{item.optionName} : {item.optionPrice}원</span>
                        <DeleteButton onClick={(event)=>handleDeleteOption(main.orderId, item.optionId,event)}>X</DeleteButton>
                    </OrderedOption>
                        ))}
                    
                    </>)}
                
        </>
            
            
    )
}
