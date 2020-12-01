import {Link, Redirect, Route} from 'react-router-dom'
import React, {Children, useState} from 'react'

import styled , {css} from 'styled-components'

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  
  
  
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
    const {nextId, menuData, orderList,setOrderList, onSetOrder, data,item } = props.data
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
    <TodoItemBlock done = {selected}  onClick = {(event)=>handleClick(event,item.optionPk, item.optionName,item.optionPrice)}> 
        <Text done = {selected}>{item.optionName} {item.optionPrice}원</Text>
    </TodoItemBlock>
    </>)
}

export default function Option(props){
    const {nextId, menuData, orderList,setOrderList, onSetOrder,data} = props.data
    const selectedMain = Number(props.match.params.selectedMain)
    function addToOrdder(e){        
        nextId.current +=1
        onSetOrder(orderList)
        setOrderList({})
    }
    return(
        <div>
            {data.option.filter((option,index)=>{
                for ( var i in data.relation){
                    if (data.relation[i].optionPk == option.optionPk && selectedMain == data.relation[i].menuPk){
                        return true
                    }
                }
            }).map(
                (item)=>{
                   return (<OptionItem data = {{...props.data, item}}  key = {item.optionPk} /> )
                }
            )}
            <Link to='/menu/1'><button onClick={addToOrdder}> 선택 완료 </button></Link>
        </div>
    )  }

