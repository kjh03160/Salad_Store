import React from 'react'
import Menuadmin from '../component/Menuadmin'
import { Route,Link, StaticRouter } from 'react-router-dom'
import Navbar from '../component/navbar/navbar'
import MenuStat from '../component/MenuStat'
import OptionStat from '../component/OptionStat'
import AdminMain from '../component/AdminMain'

export default function AdminContainer() {
    return (
        <>
        <div>
            <Navbar/>
            <div className="content">
            <Route exact path='/admin/' component = {AdminMain}/>
            <Route path='/admin/menustat' component = {MenuStat}/>
            <Route path='/admin/optionstat' component = {OptionStat}/>
            <Route path='/admin/menuadmin' component = {Menuadmin}/>
            </div>
            {/* <Link to ='/admin/stat'>매출통계{}</Link>
            <Link to ='/admin/menuadmin'>메뉴관리</Link> */}
        </div>
        </>
    )
}
