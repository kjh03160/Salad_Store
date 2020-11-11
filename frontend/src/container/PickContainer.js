import React from 'react'
import { useSelector,useDispatch} from 'react-redux'

export default function PickContainer() {
    const {mainChosen, optionChosen} = useSelector(state=>({
        mainChosen: state.order.mainChosen,
        optionChosen:state.order.optionChosen
    }))
    const dispatch= useDispatch()
    // console.log(optionChosen)
    
    return (
        <div>
            {mainChosen}
            <ul>
            {optionChosen.map((name,index)=><li key ={index}>{name}</li>)}
            </ul>
        </div>
    )
}
