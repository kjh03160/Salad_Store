import React, { useState, useEffect} from 'react'
import wholeData from '../../module/data2'
import Categories from '../Categories';

const MenuAdmin = (props) => {
    const allData = wholeData;
    const [currentData, setCurrent] = useState({...allData});

    useEffect(() => {
        // console.log(allData);
    });

    const handleCategoryAdd = catecory => {

    };

    const handleCategoryDelete = catecory => {

    };

    const handleMenuAdd = menu => {

    };

    const handleMenuDelete = menu => {

    };

    const handleImageAdd = menu => {

    };

    const handleOptionAdd = option => {

    };

    const handleOptionDelete = option => {

    };

    return(
        <div>
            메뉴관리
            <Categories
                currentData={currentData}
                onCatAdd={handleCategoryAdd}
                onCatDel={handleCategoryDelete}
                onMenAdd={handleMenuAdd}
                onMenDel={handleMenuDelete}
                onImgAdd={handleImageAdd}
                onOptAdd={handleOptionAdd}
                onOptDel={handleOptionDelete}
            />
        </div>
    );
};

export default MenuAdmin;