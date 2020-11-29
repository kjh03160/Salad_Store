import React from 'react';
import styles from './Main.module.css';
import OptionMenus from '../OptionMenus';

const Main = (props) => {
    const { id, menu, name, price, img, optionRelation, option } = props;
    const matchedOption = optionRelation.filter(relation => relation.main_id == id)
    const matchedOptionId = matchedOption.map(relation => relation.option_id)
    const subOption = option.filter(item => matchedOptionId.includes(item.id))

    const handleMenuDelete = () => {
        props.onMenDel(menu);
    };

    const handleOptionDelete = (option) => {
        props.onOptDel(option);
    };

    return (
        <div className={styles.container}>
            <div className="name">
                <h3>{name}</h3>
                <h3>{price}</h3>
                <button onClick={handleMenuDelete}>❌</button>
            </div>
            <div className="options">
                <OptionMenus
                    key={id}
                    options={subOption}
                    // onMenAdd={props.handleMenuAdd}
                    // onImgAdd={props.handleImageAdd}
                    // onOptAdd={props.handleOptionAdd}
                    onOptDel={handleOptionDelete}
                />
            </div>
        </div>
    );
};

export default Main;