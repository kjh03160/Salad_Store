import React from 'react';
import OptAddForm from './OptAddForm';
import OptionMenu from './OptionMenu/OptionMenu';

const OptionMenus = (props) => {
    const option = props.options;
    return (
        <div>
        <OptAddForm/>
        {option.map(item => (
            <OptionMenu
                key={item.id}
                name={item.name}
                price={item.price}
            />
        ))}
        </div>
    );
};

export default OptionMenus;