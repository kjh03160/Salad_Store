import React from 'react'
import { useSelector,useDispatch} from 'react-redux'

export default function OrderList() {
    // 리덕스에서 선택 완료된 주문서들
    // { }
    const {main} = useSelector(state=>({
        main: state.order
    }))

    return (
        <div>
            
            <ul>
            {main.map((item,index)=> 
            <li key = {index}>{item.main} : {item.mainPrice}원
                <ul>{item.optionList.map((item,index)=> <li key = {index}>{item.optionName}price:{item.optionPrice}원</li>)}</ul>
            </li>)}
            </ul>
        </div>
    )
}
