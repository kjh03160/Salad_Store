import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        // className={styles.className}
        <nav className={styles.navbar}>
            <div className = {styles.navCenter}>
                <div className = {styles.navTitle}>
                    <Link to= "/admin/" className = {styles.title}>Make Salad</Link>
                </div>
            </div>
            <div className = {styles.navCenter}>
               <div className = {styles.btn}>
                    <Link to="/admin/menuadmin" className = {styles.navList1}>메뉴 관리</Link>
                
                </div>
                <div className = {styles.btn}>
                    <Link to="#" className = {styles.navList2}>매출 통계</Link>
                    <ul>
                        <Link to="/admin/menustat" className = {styles.subList}>메뉴별 통계</Link>
                        <Link to="/admin/optionstat" className = {styles.subList}>옵션별 통계</Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
};



export default Navbar;

// <Link to="/admin/">MAKE SALAD</Link>
// <Link to="/admin/menustat">메뉴통계</Link>
// <Link to="/admin/optionstat">옵션통계</Link>
// <Link to="/admin/menuadmin">메뉴관리</Link>