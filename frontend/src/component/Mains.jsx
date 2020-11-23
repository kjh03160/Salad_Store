import React from 'react';
import Menu from './Menu';

const Mains = (props) => {
    const { optionRelation, main, option } = props;

    return (
        <div>
            {/* <CatAddForm onCatAdd={props.onCatAdd} /> */}
            {console.log(props)}
            {main.map(menu => (
                <Menu
                    key={menu.id}
                    price={menu.price}
                    img={menu.img}
                />
            ))}
        </div>
        // <div className="categories">
        //     <CatAddForm onCatAdd={props.onCatAdd} />
        //     {categoryPk.map(category => (
        //         <Category
        //             key={category.id}
        //             name={category.name}
        //             main={main.filter(menu => menu.categoryPk == category.id)}
        //             option={option}
        //             optionRelation={optionRelation}
        //         />
        //     ))}
        // </div>
    );

};

export default Mains;