import React from 'react'
import Menuadmin from '../component/Menuadmin'
import Stat from '../component/Stat'
import { Route,Link, StaticRouter } from 'react-router-dom'

export default function AdminContainer() {
    return (
        <>
        <div>
            네브바
            <Link to ='/admin/stat'>매출통계{}</Link>
            <Link to ='/admin/menuadmin'>메뉴관리</Link>
            
        </div>
        <Route exact path='/admin/stat' component = {Stat}/>
        <Route exact path='/admin/menuadmin' component = {Menuadmin}/>
        </>
    )
}
