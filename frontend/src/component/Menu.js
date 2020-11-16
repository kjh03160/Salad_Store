import {Link, Redirect, Route} from 'react-router-dom'
import React, {useRef} from 'react'


export default function Menu(props){
    // 메인메뉴 데이터 받아서 props.match.params.categoryPk 로 걸러서 보여주기 
    // 메인 메뉴 데이터 {카테고리, 메인메뉴 정보들}
    const {nextId, menuData, orderList,setOrderList} = props.data
    // console.log(props.match.params.categoryPk)
    
    function handleClick(e){
        setOrderList(
            {
                orderId:nextId.current,
                main:e.target.innerText,
                optionList:[]       
            }
        )
    }
    
    
    return(
        <div >
            {menuData.main.map(
                (menu,index)=>{
                    // console.log(menu)
                    if (menu.categoryPk==props.match.params.categoryPk){
                        return(
                        <Link to ={`/menu/${menu.categoryPk}/${menu.id}`} key = {index} onClick={handleClick}>{menu.name} </Link>
                                )
                    }
                }
            )}

        </div>
    )

}