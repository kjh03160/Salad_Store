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
                <ul className = {styles.navBtn}>
                    <li>
                    <Link to="/admin/menustat" className = {styles.navList}>메뉴 관리</Link>
                    </li>
                    <li>
                    <Link to="/admin/optionstat" className = {styles.navList}>매출 통계</Link>
                    </li>
                    {/* <li>
                    <Link to="/admin/menuadmin" className = {styles.navList}>메뉴관리</Link>
                    </li> */}
                </ul>
            </div>
            {/* <ul>
                <Link to="/admin/">MAKE SALAD</Link>
                <Link to="/admin/menustat">메뉴통계</Link>
                <Link to="/admin/optionstat">옵션통계</Link>
                <Link to="/admin/menuadmin">메뉴관리</Link>
            </ul> */}
        </nav>
    );
};



export default Navbar;