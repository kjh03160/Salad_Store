import React from 'react'
import { useSelector,useDispatch} from 'react-redux'

export default function OrderList({selectedMenu}) {

    return (
        <div>
            
            <ul>
            {selectedMenu.map((item,index)=> 
            <li key = {index}>{item.main} : {item.mainPrice}원
                <ul>{item.optionList.map((item,index)=> <li key = {index}>{item.optionName}price:{item.optionPrice}원</li>)}</ul>
            </li>)}
            </ul>
        </div>
    )
}
