import React from 'react';
import Main from './Main/Main';
import MainAddForm from './MainAddForm';

const Mains = (props) => {
    const { optionRelation, main, option } = props;

    const handleMenuDelete = (menu) => {
        props.onMenDel(menu);
    };

    const handleOptionDelete = (option) => {
        props.onOptDel(option);
    };
    
    return (
        <div>
            <MainAddForm/>
            <br/>
            {/* {console.log(main.map(item => item.id))} */}
            {main.map(menu => (
                <>
                <Main
                    key={menu.id}
                    id={menu.id}
                    menu={menu}
                    name={menu.name}
                    price={menu.price}
                    img={menu.img}
                    optionRelation={optionRelation} // 관계 필요한지 모르겠음
                    option={option}
                    // onMenAdd={handleMenuAdd}
                    onMenDel={handleMenuDelete}
                    // onImgAdd={handleImageAdd}
                    // onOptAdd={handleOptionAdd}
                    onOptDel={handleOptionDelete}
                />
                <br/>
                </>
            ))}
        </div>
    );

};

export default Mains;