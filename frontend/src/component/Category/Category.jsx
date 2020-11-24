import React from 'react';
import Mains from '../Mains';
import styles from './Category.module.css';

const Category = (props) => {
    const { optionRelation, main, option, categoryPk, category, name } = props;
    
    const handleCategoryDelete = () => {
        props.onCatDel(category);
    };

    const handleMenuDelete = (menu) => {
        props.onMenDel(menu);
    }

    const handleOptionDelete = (option) => {
        props.onOptDel(option);
    };

    return (
        <div className={styles.container}>
            <div className="name">
                <h2>{name}</h2>
                <button onClick={handleCategoryDelete}>❌</button>
            </div>
            <div className="menus">
                <Mains
                    key={categoryPk}
                    optionRelation={optionRelation}
                    main={main}
                    option={option}
                    // onMenAdd={props.handleMenuAdd}
                    onMenDel={handleMenuDelete}
                    // onImgAdd={props.handleImageAdd}
                    // onOptAdd={props.handleOptionAdd}
                    onOptDel={handleOptionDelete}
                />
            </div>
        </div>
    );
};

export default Category;