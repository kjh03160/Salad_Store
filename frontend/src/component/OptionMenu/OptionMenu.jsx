import React from 'react';
import styles from './OptionMenu.module.css';

const OptionMenu = (props) => {
    const {name, price, option} = props;

    const handleOptionDelete = () => {
        props.onOptDel(option);
    };

    return (
        <div className={styles.container}>
            <div className="name">
                <h6>{name}</h6>
                <h6>{price}</h6>
                <button onClick={handleOptionDelete}>❌</button>
            </div>
        </div>
    );
};

export default OptionMenu;