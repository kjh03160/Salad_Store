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
                    category={category}
                    main={main.filter(menu => menu.categoryPk === category.id)}
                    option={option}
                    optionRelation={optionRelation}
                    onCatDel={props.onCatDel}
                    onMenAdd={props.onMenAdd}
                    onMenDel={props.onMenDel}
                    onImgAdd={props.onImgAdd}
                    onOptAdd={props.onOptAdd}
                    onOptDel={props.onOptDel}
                />
                <br/>
                </>
            ))}
            
        </ul>
    );
};

export default Categories;