import React from 'react';
import OptAddForm from './OptAddForm';
import OptionMenu from './OptionMenu/OptionMenu';

const OptionMenus = (props) => {
    const option = props.options;

    const handleOptionDelete = (option) => {
        props.onOptDel(option);
    };

    return (
        <div>
        <OptAddForm/>
        {option.map(item => (
            <OptionMenu
                key={item.id}
                option={item}
                name={item.name}
                price={item.price}
                // onMenAdd={props.handleMenuAdd}
                // onImgAdd={props.handleImageAdd}
                // onOptAdd={props.handleOptionAdd}
                onOptDel={handleOptionDelete}
            />
        ))}
        </div>
    );
};

export default OptionMenus;