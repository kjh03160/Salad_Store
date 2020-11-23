import React from 'react';
import CatAddForm from './CatAddForm';
import Mains from './Mains';
import Category from './Category/Category';

const Categories = (props) => {
    const {currentData} = props;
    const {optionRelation, main, option, categoryPk} = currentData;

    return (
        <div className="categories">
            <CatAddForm onCatAdd={props.onCatAdd} />
            {categoryPk.map(category => (
                <Category
                    key={category.id}
                    name={category.name}
                    main={main.filter(menu => menu.categoryPk == category.id)}
                    option={option}
                    optionRelation={optionRelation}
                />
            ))}
        </div>
    );
};

export default Categories;