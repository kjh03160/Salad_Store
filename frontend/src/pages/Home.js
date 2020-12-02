import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'


import '../App.css';
import logo from '../logo.svg';
export default function Home(){
    const {authenticated } = useSelector(state=>({
        authenticated : state.auth.authenticated
    }))
    return(
        
        
        
      <div>
        {/* <Link to ='/menu/cate'>sdfsf</Link> */}
          {(authenticated===false)
          ?(<Link to ='/login'>LOGIN</Link> )
          :(<div>LOGOUT</div>)}
      </div>

    )
}