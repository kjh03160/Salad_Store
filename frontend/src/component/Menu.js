import {Link, Redirect, Route} from 'react-router-dom'
import React, {useRef} from 'react'

import Button from '@material-ui/core/Button';
import styled from 'styled-components'
const MainMenuCotainer = styled.div`
display: flex;
flex-wrap : wrap;
width:280px;
height:250px;
border : 1px solid black;
margin: 25px 0 0 30px;

`
const ImageBox = styled.div`
width:100%;
height:80%;
display :flex;
justify-content:center;
align-items:center;
`
const Description = styled.div`
width:50%;
display: flex;
justify-content: center;
align-items: center;
`
export default function Menu(props){
    // 컨테이터에서 메뉴 데이터 받아서 props.match.params.categoryPk 로 걸러서 보여주기 
    // 패키지 뜯기
    const {nextId, menuData, orderList,setOrderList,data} = props.data
    // 장바구니 담기
    function handleClick(event, id, name, price){
        setOrderList(
            {
                orderId:nextId.current,
                mainId : id,
                main:name,
                mainQuantity:1,
                mainPrice:price,
                optionList:[]       
            }
        )
        nextId.current+=1
    }
    return(
    <>      
        {data.map(
            (menu,index)=>{
              if(menu.categoryPk == props.match.params.categoryPk){
                return (
                  <Link style={{textDecoration:"none"}}to ={`/menu/${menu.categoryPk}/${menu.menuPk}`}key = {menu.menuPk} onClick={(event)=>handleClick(event, menu.menuPk,menu.menuName,menu.menuPrice)}>
                        <MainMenuCotainer>
                            <ImageBox><img style = {{width:"100%", height:"100%"}}src ={menu.menuImage}/></ImageBox>
                            <Description>{menu.menuName}</Description><Description>{menu.menuPrice}원</Description>
                        </MainMenuCotainer>
                        </Link>
                )
              }
            }
        )}
            {menuData.main.map(
                (menu,index)=>{
                    if (menu.categoryPk==props.match.params.categoryPk){
                        return(
                            <Link style={{textDecoration:"none"}}to ={`/menu/${menu.categoryPk}/${menu.id}`}key = {menu.id} onClick={(event)=>handleClick(event, menu.id,menu.name,menu.price)}>
                        <MainMenuCotainer>
                            <ImageBox>{menu.image}</ImageBox>
                            <Description>{menu.name}</Description><Description>{menu.price}원</Description>
                        </MainMenuCotainer>
                        </Link>
                                )
                    }
                }
            )}
        </>
    )
}