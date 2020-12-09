import {Link} from 'react-router-dom'
import React, { useState} from 'react'

import styled , {css} from 'styled-components'
const Wrapper = styled.section`
display:flex;
width:100%;
height:100%;
flex-direction:column;
`
const MainImage = styled.section`
width:100%;
height:50%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
div{
    width:50%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    img{
    width:60%;
    margin-bottom:20px;
    }
    h2{
        width:100%;
        text-align:center;
        justify-content:center;
        align-items:center;
    }
}


`
const OptionList = styled.section`
width:100%;
height:50%;
display:inline-flex;
flex-wrap:wrap;
align-content:flex-start;
position:relative;



`

const OptionItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  width:300px;
  height:40px;
  margin:5px;
  border:3px solid rgba(50, 50, 93, 0.11);
  border-radius:10px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  &:hover{
      background-color:#ced4da;
      div{
        color:white;
      }
      
  }
  cursor: pointer;
`;
const DoneButton = styled.button`
box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
cursor: pointer;
outline:none;
width:100px;
height:40px;
border:none;
border-radius:4px;
background-color:black;
color:white;
position:absolute;
right:0;
bottom:0;
margin:20px;
font-size:1.5rem;
font-family: 'Do Hyeon', sans-serif;
`
const Text = styled.div`
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
    const {nextId, orderList,setOrderList, onSetOrder, data,item } = props.data
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
    <OptionItemBlock done = {selected}  onClick = {(event)=>handleClick(event,item.optionPk, item.optionName,item.optionPrice)}> 
        <Text done = {selected}>{item.optionName} {item.optionPrice}원</Text>
    </OptionItemBlock>
    </>)
}

export default function Option(props){
    const {nextId,orderList,setOrderList, onSetOrder,data} = props.data
    console.log(data)
    const selectedMain = Number(props.match.params.selectedMain)
    function addToOrdder(e){        
        nextId.current +=1
        onSetOrder(orderList)
        setOrderList({})
    }
    return(
        <Wrapper>
            <MainImage>
                {data.main.filter((main)=> main.menuPk == selectedMain).map(
                    (menu)=>(<div>
                                <img src={menu.menuImage}/>
                                <h2>{menu.menuName}</h2>
                            </div>)
                )}
            </MainImage>
            <OptionList>
                {data.option.filter((option,index)=>{
                    for ( var i in data.relation){
                        if (data.relation[i].optionPk == option.optionPk && selectedMain == data.relation[i].menuPk && option.optionSoldout != 1){
                            return true
                        }
                    }
                }).map(
                    (item)=>{
                    return (<OptionItem data = {{...props.data, item}}  key = {item.optionPk} /> )
                    }
                )}
                <Link to='/menu/1'><DoneButton onClick={addToOrdder}> 선택 완료 </DoneButton></Link>
            </OptionList>
        </Wrapper>
    )  }

