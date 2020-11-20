import {Link, Redirect, Route} from 'react-router-dom'
import React, {useRef} from 'react'

import './menu.css'

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
                        <div className="itemBox">
                        <div className="imageBox">{menu.image}</div>
                        <span>{menu.name}</span><span>{menu.price}원</span>
                        </div>
                        </Link>
                                )
                    }
                }
            )}
        </>
    )
}