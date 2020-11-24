import React from 'react';
import CatAddForm from './CatAddForm';
import Mains from './Mains';
import Category from './Category/Category';

const Categories = (props) => {
    const {currentData} = props;
    const {optionRelation, main, option, categoryPk} = currentData;


    return (
        <ul className="categories">
            <CatAddForm onCatAdd={props.onCatAdd} />
            <br/>
            {categoryPk.map(category => (
                <>
                <Category
                    key={category.id}
                    name={category.name}
                    main={main.filter(menu => menu.categoryPk == category.id)}
                    option={option}
                    optionRelation={optionRelation}
                    onCatDel={props.handleCategoryDelete}
                    onMenAdd={props.handleMenuAdd}
                    onMenDel={props.handleMenuDelete}
                    onImgAdd={props.handleImageAdd}
                    onOptAdd={props.handleOptionAdd}
                    onOptDel={props.handleOptionDelete}
                />
                <br/>
                </>
            ))}
            
        </ul>
    );
};

export default Categories;