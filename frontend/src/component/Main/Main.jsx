import React from 'react';
import styles from './Main.module.css';
import OptionMenus from '../OptionMenus';

const Main = (props) => {
    const { id, name, price, img, optionRelation, option } = props;
    const matchedOption = optionRelation.filter(relation => relation.main_id == id)
    const matchedOptionId = matchedOption.map(relation => relation.option_id)
    const subOption = option.filter(item => matchedOptionId.includes(item.id))

    return (
        <div className={styles.container}>
            <div className="name">
                <h3>{name}</h3>
                <h3>{price}</h3>
                <button onClick={props.onCatDel}>❌</button>
            </div>
            <div className="options">
                <OptionMenus
                    key={id}
                    options={subOption}
                />
            </div>
        </div>
    );
};

export default Main;