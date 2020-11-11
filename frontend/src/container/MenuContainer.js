import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'


import initialState from '../module/data'
import {setMain, setOption} from '../module/order'

import Option from '../component/Option'
import Menu from '../component/Menu'

export default function MenuContainer(props) {
    // const data = useSelector(state =>({
    //     mainChosen: state.order.mainChosen,
    //     optionChosen:state.order.optionChosen
    // }))
    console.log(props)
    const menuData = initialState
    const dispatch = useDispatch()
    const onSetMain = (main)=>dispatch(setMain(main))
    const onSetOption = (option) =>dispatch(setOption(option))
    const wholeData = {menuData, onSetMain, onSetOption}
    return (
        <>
        
        <Route exact path='/menu/:categoryPk' render={(props)=><Menu {...props} data = {wholeData}/>}/>
        <Route path='/menu/:categoryPk/:selectedMain' render={(props)=><Option {...props} data = {wholeData}/>}/>
        <Route  exact path='/menu/main' render={(props)=><Option {...props} data = {wholeData}/>}/>
        </>
    )
}
