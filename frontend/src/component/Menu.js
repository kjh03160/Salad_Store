import {Link} from 'react-router-dom'
import React from 'react'


import styled from 'styled-components'
const MainMenuCotainer = styled.div`
&:hover {
    transform: scale(1.10);
  }
transition:all 0.5s linear;
display: flex;
flex-wrap : nowrap;
width:280px;
height:250px;
margin: 25px 0 0 30px;
box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
a{
    text-decoration:none;
    height:100%;
    width:100%;
    display:flex;
    flex-wrap:wrap;
}
`

const ImageBox = styled.div`
width:100%;
height:80%;
display :flex;
justify-content:center;
align-items:center;
cursor: pointer;
`
const Description = styled.div`
width:50%;
height:20%;
display: flex;
justify-content: center;
align-items: center;
font-size:1.3rem;
color:black;
cursor: pointer;
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
        {data.main.map(
            (menu,index)=>{
              if(menu.categoryPk == props.match.params.categoryPk && menu.menuSoldout != 1){
                return (
                  
                        <MainMenuCotainer>
                            <Link style={{textDecoration:"none",height:"100%",width:"100%",display:"flex",flexWrap:"wrap"}}to ={`/menu/${menu.categoryPk}/${menu.menuPk}`}key = {menu.menuPk} onClick={(event)=>handleClick(event, menu.menuPk,menu.menuName,menu.menuPrice)}>
                            <ImageBox><img style = {{width:"100%", height:"100%"}}src ={menu.menuImage}/></ImageBox>
                            <Description>{menu.menuName}</Description><Description>{menu.menuPrice}원</Description>
                            </Link>
                        </MainMenuCotainer>
                        
                )
              }
            }
        )}
            {/* {menuData.main.map(
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
            )} */}
        </>
    )
}