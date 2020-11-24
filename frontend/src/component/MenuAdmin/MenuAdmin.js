import React, { useState, useEffect} from 'react'
import wholeData from '../../module/data2'
import Categories from '../Categories';

const MenuAdmin = (props) => {
    const allData = wholeData; // wholeData는 axios를 이용해 가져온 데이터
    const {optionRelation, main, option, categoryPk} = allData;
    const [state, setState] = useState({ optionRelation: [...optionRelation], main: [...main], option: [...option], categoryPk: [...categoryPk]});

    useEffect(() => {
        console.log(state);
        // axios를 이용해 데이터를 가져온다
    });
    
    const handleCategoryAdd = catecory => {

    };

    const handleCategoryDelete = catecory => {
        const categoryPk = state.categoryPk.filter(item => item.id !== catecory.id)
        setState({ ...state, categoryPk});
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
                currentData={state}
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