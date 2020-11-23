import React from 'react';
import Mains from '../Mains';
import styles from './Category.module.css';

const Category = (props) => {
    const { key, optionRelation, main, option, categoryPk, name} = props;

    return (
        <ul>
            <div className="name">
                <h2>{name}</h2>
                <button onClick={props.onCatDel}>❌</button>
            </div>
            <div className="menus">
                <Mains
                optionRelation={optionRelation}
                main={main}
                option={option}
                />
            </div>
        </ul>
    );
};

export default Category;