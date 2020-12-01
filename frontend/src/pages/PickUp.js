import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import OrderAPI from '../api/orderAPI'
import { useState } from 'react'


export default function PickUp(){
    const [data, setData] = useState(null)
    const fetchData = async () =>{
        const response = await OrderAPI.getOrders()
        console.log(response.data)
        setData(response.data.orderList)
    }
    useEffect(()=>{
      fetchData()
    },[])
    if (data === null) return <div>로딩중...</div>
    return(
        
      <div>
        {data.map((order)=>
        <div key = {order.order_pk}>{order.order_pk}
        <span>{order.menus.map((main)=><span key = {main.product_pk}>{main.menu_name}{main.options}</span>)}</span></div>
        )}
      </div>

    )
}