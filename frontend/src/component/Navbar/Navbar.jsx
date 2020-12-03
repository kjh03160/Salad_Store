import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            {/* 여기는 navbar. 메뉴통계랑 옵션통계는 드롭다운으로 구현해야 함! */}
            {/* 왜 이름바뀌는건 안대는거냐 */}
            <Link to="/admin/">MAKE SALAD</Link>
            <Link to="/admin/menustat">메뉴통계</Link>
            <Link to="/admin/optionstat">옵션통계</Link>
            <Link to="/admin/menuadmin">메뉴관리</Link>
        </nav>
    );
};

export default Navbar;