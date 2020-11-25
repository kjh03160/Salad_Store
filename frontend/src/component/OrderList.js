import React from 'react'
import { useSelector,useDispatch} from 'react-redux'

export default function OrderList(props) {
    const {onDeleteOption,onQuantityDecrement,onQuantityIncrement,selectedMenu,onDeleteOrder} = props.data

    let cashAmount = 0
    selectedMenu.forEach((item)=> {
        cashAmount += item.mainPrice * item.mainQuantity
        item.optionList.forEach((option)=> cashAmount += option.optionPrice)   
    })

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
        <div>
            
            <ul>
            {selectedMenu.map((main,index)=> 
                <li key = {index}>{main.main} : {main.mainPrice}원 {main.mainQuantity}개 
                <button onClick={()=>handleIncrement(main.orderId)}>+1</button>
                <button onClick={()=>handleDecrement(main.orderId)}>-1</button>
                <button onClick={()=>handleDeleteOrder(main.orderId)}>삭제</button>
                    <ul>{main.optionList.map((item,index)=> 
                            <li key = {index}>{item.optionName}price:{item.optionPrice}원<button onClick={(event)=>handleDeleteOption(main.orderId, item.optionId,event)}>삭제</button></li>)}
                    </ul>
                </li>)}
            <div>총금액: {cashAmount}</div>
            </ul>
        </div>
    )
}
