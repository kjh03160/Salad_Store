
import React from 'react'
import { useSelector,useDispatch} from 'react-redux'
import styled,{createGlobalStyle} from 'styled-components'

const Test = styled.div`

display:flex;
    justify-content:flex-end;
.orderContentButton {
    
  }

`
const OrderCompleteButton = styled.button`

`
const OrderedMain = styled.div `
width:100%;
padding-bottom:5px;

/* display:flex;
flex-direction:column; */

`
const OrderedOption = styled.div`
width:100%;
height:20px;
padding-left:50px;
`


export default function OrderList(props) {
    const {onDeleteOption,onQuantityDecrement,onQuantityIncrement,selectedMenu,onDeleteOrder,cashAmount,setDialog} = props.data

    

    const handleIncrement = (orderId) =>{
        onQuantityIncrement(orderId)
    }
    const handleDecrement= (orderId) =>{
        onQuantityDecrement(orderId)
    }
    const handleDeleteOption = (orderId,optionId,event) =>{     
        onDeleteOption(orderId,optionId)
    }
    const handleDeleteOrder=(orderId)=>{
        onDeleteOrder(orderId)
    }
    
    return (
            
            <>
            {selectedMenu.map((main,index)=> 
                <OrderedMain key = {index}>{index+1}. {main.main} : {main.mainPrice}원 {main.mainQuantity}개 
                <button onClick={()=>handleIncrement(main.orderId)}>+1</button>
                <button onClick={()=>handleDecrement(main.orderId)}>-1</button>
                <button onClick={()=>handleDeleteOrder(main.orderId)}>삭제</button>
                    {main.optionList.map((item,index)=> 
                    (<OrderedOption>
                        {item.optionName} : {item.optionPrice}원
                        <button onClick={(event)=>handleDeleteOption(main.orderId, item.optionId,event)}>삭제</button>
                    </OrderedOption>))}
                    
                </OrderedMain>)}
                <Test className="orderContentButton">
                    총금액: {cashAmount}
                    <OrderCompleteButton onClick = {()=> setDialog({check:true,card:false})}>주문완료</OrderCompleteButton>  
                </Test>
        </>
            
            
    )
}
