import React from 'react'
import { useSelector,useDispatch} from 'react-redux'

export default function OrderList() {
    const {main,optionList} = useSelector(state=>({
        main: state.order
        

    }))
    
    const dispatch= useDispatch()
    
    
    return (
        <div>
            
            <ul>
            {main.map((item,index)=> 
            
            <li key = {index}>{item.main}
            
                (<ul>{item.optionList.map((item)=> <li>{item}</li>)}</ul>)
            
            </li>)}
            {/* {optionChosen.map((name,index)=><li key ={index}>{name}</li>)} */}
            </ul>
        </div>
    )
}
