import React, { useState, useEffect } from 'react'
import menuApi from '../../api/saveData';
import styles from './MenuAdmin.module.css';

const MenuAdmin = (props) => {
    const [relations, setRelations] = useState([]);
    const [mains, setMains] = useState([]);
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState([]);

    const catInputRef = React.createRef();
    const catFormRef = React.createRef();

    // const menuInputRef = React.createRef();
    // const menuPriceRef = React.createRef();
    // const menuFormRef = React.createRef();


    const apiCall = async () => {
        const response = await menuApi.getAll();
        console.log(response.data);
        const { relation, main, option, category } = response.data;
        setRelations(relation);
        setMains(main);
        setOptions(option);
        setCategories(category);
    };

    useEffect(() => {
        apiCall();
        // axios를 이용해 데이터를 가져온다
    }, []);

    const getMatchedMains = (category, mains) => {
        return mains.filter(main => category.categoryPk === main.categoryPk);
    };

    const getMatchedOptions = (main, options) => {
        const matchedRelation = relations.filter(relation => main.menuPk === relation.menuPk);
        const result = [];
        if (matchedRelation.length !== 0) {
            for (const relation of matchedRelation) {
                for (const option of options) {
                    if (relation.optionPk === option.optionPk) {
                        result.push(option);
                    }
                }
            }
        }
        return result;
    };

    const handleCategoryAdd = name => {
        const data = { name };
        console.log(data);
        menuApi.addCategory(data);
    };

    const handleCategoryDelete = category => {
        // const categoryPk = state.category.filter(item => item.id !== category.id)
        // setState({ ...state, category: categoryPk});
    };

    const onCatSubmit = e => {
        e.preventDefault();
        const name = catInputRef.current.value;
        handleCategoryAdd(name);
        catFormRef.current.reset();
    };

    const handleMenuAdd = (name, price, categoryPk) => {
        let data = new FormData();
        data.append('category_pk', categoryPk);
        data.append('menu_name', name);
        data.append('menu_price', price);
        data.append('menu_soldout', 0);
        console.log(data);
        menuApi.newMain(data);

    };

    const handleMenuDelete = menu => {
        // const main = state.main.filter(item => item.id !== menu.id)
        // setState({ ...state, main});
    };

    const onMenuSubmit = (e,  categoryPk) => {
        e.preventDefault();
        const name = e.target[0].value;
        const price = parseInt(e.target[1].value);
        if (isNaN(price)) {
            e.target.reset();
        }
        else {
            handleMenuAdd(name, price, categoryPk);
            e.target.reset();
        }
        console.log(name, price, categoryPk);
    };

    const handleImageAdd = menu => {

    };

    const handleOptionAdd = opt => {

    };

    const handleOptionDelete = opt => {
        // const option = state.option.filter(item => item.id !== opt.id)
        // setState({ ...state, option});
    };

    const onOptionSubmit = e => {

    };

    return (
        <div className={styles.content}>
            <form ref={catFormRef} className={styles.catAddForm} onSubmit={onCatSubmit}>
                <input ref={catInputRef} type="text" className={styles.catAddInput} placeholder="카테고리 추가" />
                <button className={styles.catAddBtn}>➕</button>
            </form>
            {categories.map((category, i) => (
                <div className={styles.category} key={category.categoryPk}>
                    <p className={styles.categoryName}>{category.categoryName}</p>
                    <form className={styles.menuAddForm} onSubmit={(e) => onMenuSubmit(e, category.categoryPk)}>
                        <input type="text" name="menuName" className={styles.menuAddInput} placeholder="메인 메뉴 추가" />
                        <input type="text" name="menuPrice" className={styles.menuAddInput} placeholder="가격" />
                        <button className={styles.menuAddBtn}>➕</button>
                    </form>
                    {getMatchedMains(category, mains).map((main, i) => (
                        <div className={styles.main} key={main.menuPk}>
                            <p className={styles.mainName}>{main.menuName}</p>
                            {getMatchedOptions(main, options).map((option, i) => (
                                <div className={styles.option} key={option.optionPk}>
                                    <p className={styles.optionName}>{option.optionName}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MenuAdmin;