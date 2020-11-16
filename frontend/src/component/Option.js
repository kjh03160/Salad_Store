import {Link, Redirect, Route} from 'react-router-dom'
import React, {useState} from 'react'


export default function Option(props){
    
    const {nextId, menuData, orderList,setOrderList, onSetOrder} = props.data
    
    
    // let slug = props.match.params.slug
    
    // console.log(`${props.match.params.selectedMain} 이걸봐`)
    // console.log(props.match.params)
    console.log(orderList)
    function handleClick(e){
        setOrderList(
            {
                ...orderList,
                optionList:[...orderList.optionList, e.target.innerText]
            }
        )
       
        
        // onSetOption(e.target.innerText)  // :selectedMain이 이전에 선택된 메인메뉴 PK
        // console.log(e.target.innerText)
        
    }
    function addToOrdder(e){
        onSetOrder(orderList)
        setOrderList({})
        nextId.current +=1
        
        
    }

    // 옵션 다선택시 뒤로 돌아가기 (메인메뉴 비운다는 조건)
    if (orderList.main)
    {return(
        <div>
            <ul>
                {/* {main.map((name)=>{return (<li>{name.name}</li>)})} */}
            {menuData.option.map((menu,index)=>(<li id={menu.id} key = {menu.id} onClick={handleClick}>{menu.name} </li>))}
            </ul>
            <button onClick={addToOrdder}> 선택 완료 </button>
        </div>
    )  }else{
        return <Redirect to ={{pathname:"/"}}/>
    }

}