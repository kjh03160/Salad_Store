import {Link, Redirect, Route} from 'react-router-dom'
import React from 'react'


export default function Menu(props){
    // 메인메뉴 데이터 받아서 props.match.params.categoryPk 로 걸러서 보여주기 
    const {menuData, onSetMain,onSetOption} = props.data
    console.log(props.match.params.categoryPk)
    const {main} = menuData
    function handleClick(e){
        onSetMain(e.target.innerText)
    }
    
    
    return(
        <div >
            {main.map(
                (menu,index)=>{
                    console.log(menu)
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