import {Link, Redirect, Route} from 'react-router-dom'
import React, {useState} from 'react'

export default function Option(props){
    const {nextId, menuData, orderList,setOrderList, onSetOrder} = props.data
    // console.log(`${props.match.params.selectedMain} 이걸봐`)
    function handleClick(event){
        let optionPrice =  0
        let optionId = 0
        menuData.option.forEach((item,index)=> { 
            if (item.name == event.target.innerText){
                optionId = item.id
                optionPrice =  item.price
            }
        })

        setOrderList(
            {
                ...orderList,
                optionList:[
                    ...orderList.optionList, 
                    {

                        optionName:event.target.innerText,
                        optionPrice:optionPrice
                    }
                ]
            }
        )
    }
    function addToOrdder(e){
        onSetOrder(orderList)
        setOrderList({})
        nextId.current +=1
        
        
    }

    // 옵션 다선택시 뒤로 돌아가기 (메인메뉴 비운다는 조건)
    if (orderList.main){
    return(
        <div>
            <ul>
                {/* {main.map((name)=>{return (<li>{name.name}</li>)})} */}
            {menuData.option.map((option,index)=>(
            <li id={option.id} key = {option.id} onClick={handleClick}>
                {option.name}
                </li>
                
            
            
            ))}
            </ul>
            <button onClick={addToOrdder}> 선택 완료 </button>
        </div>
    )  }else{
        return <Redirect to ={{pathname:"/"}}/>
    }

}