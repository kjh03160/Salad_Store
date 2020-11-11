import {Link, Redirect, Route} from 'react-router-dom'
import React from 'react'


export default function Option(props){
    const {menuData, onSetMain,onSetOption} = props.data
    const {main,option} = menuData
    let slug = props.match.params.slug
    // console.log(slug)
    // console.log(`${props.match.params.selectedMain} 이걸봐`)
    // console.log(props.match.params)
    function handleClick(e){
    
        onSetOption(e.target.innerText)
        console.log(e.target.innerText)
        
    }
    
    
    return(
        <div>
            <ul>
                {/* {main.map((name)=>{return (<li>{name.name}</li>)})} */}
            {option.map((menu,index)=>(<li key = {index} onClick={handleClick}>{menu.name} </li>))}
            </ul>
        </div>
    )

}