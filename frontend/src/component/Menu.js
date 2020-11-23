import {Link, Redirect, Route} from 'react-router-dom'
import React, {useRef} from 'react'

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
    const {nextId, menuData, orderList,setOrderList} = props.data
    
    // 장바구니 담기
    function handleClick(e){
        let mainPrice = 0
        let main = ''
        let mainId = 0
        menuData.main.forEach((item,index)=> {    
            if (item.id == e.currentTarget.id){
                mainPrice =item.price
                main = item.name
                mainId = item.id
                
            }
        })
        setOrderList(
            {
                orderId:nextId.current,
                mainId : mainId,
                main:main,
                mainQuantity:1,
                mainPrice:mainPrice,
                optionList:[]       
            }
        )
    }
    return(
    <>    
            {menuData.main.map(
                (menu,index)=>{
                    if (menu.categoryPk==props.match.params.categoryPk){
                        return(
                            <Link to ={`/menu/${menu.categoryPk}/${menu.id}`} id = {menu.id}key = {menu.id} onClick={handleClick}>
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