import {Link, Redirect, Route} from 'react-router-dom'
import React, {Children, useState} from 'react'

import styled , {css} from 'styled-components'

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  
  
  
`;
const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;
function OptionItem(props){
    const {nextId, menuData, orderList,setOrderList, onSetOrder, option } = props.data
    const [selected, setSelected] = useState(false)
    function handleClick(event,id, name, price, ){
        setOrderList(
            {
                ...orderList,
                optionList: (selected==false)?
                (orderList.optionList.concat(
                    {
                        optionId:id,
                        optionName:name,
                        optionPrice:price,
                    }
                )):
                (orderList.optionList.filter(
                    (option)=> option.optionId != id
                ))
            }
        )
        setSelected(!selected);
    }
    return (
    <>
    <TodoItemBlock done = {selected}  onClick = {(event)=>handleClick(event,option.id, option.name,option.price)}> 
        <Text done = {selected}>{option.name} {option.price}원</Text>
    </TodoItemBlock>
    </>)
}

export default function Option(props){
    const {nextId, menuData, orderList,setOrderList, onSetOrder} = props.data
    // console.log(`${props.match.params.selectedMain} 이걸봐`)
    function addToOrdder(e){        
        nextId.current +=1
        onSetOrder(orderList)
        setOrderList({})
    }
    return(
        <div>
            
                {/* {main.map((name)=>{return (<li>{name.name}</li>)})} */}
            {menuData.option.map((option,index)=>(
            <OptionItem data = {{...props.data, option}}  key = {option.id} /> 
            ))}
            
            <Link to='/menu/1'><button onClick={addToOrdder}> 선택 완료 </button></Link>
        </div>
    )  }

