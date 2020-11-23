import React from 'react';
import Menuadmin from '../component/MenuAdmin/MenuAdmin';
import { Route,Link, StaticRouter } from 'react-router-dom';
import Navbar from '../component/navbar/navbar';
import MenuStat from '../component/MenuStat/MenuStat';
import OptionStat from '../component/OptionStat/OptionStat';
import AdminMain from '../component/AdminMain/AdminMain';
import styles from './AdminContainer.module.css';

export default function AdminContainer() {
    return (
        <>
        <div>
            <Navbar/>
            <div className={styles.content}>
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
