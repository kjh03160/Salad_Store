import React, { useState, useEffect } from 'react'
import menuApi from '../../api/saveData';
import styles from './MenuAdmin.module.css';

const MenuAdmin = (props) => {
    const [relations, setRelations] = useState([]);
    const [mains, setMains] = useState([]);
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [btnClicked, setBtnClicked] = useState(0);

    const catInputRef = React.createRef();
    const catFormRef = React.createRef();

    const optionInputRef = React.createRef();
    const optionPriceRef = React.createRef();
    const optionFormRef = React.createRef();


    const apiCall = async () => {
        const response = await menuApi.getAll();
        console.log(response.data);
        const { relation, main, option, category } = response.data;
        setRelations(relation);
        setMains(main);
        setOptions(option);
        setCategories(category);
    };

    const categoryCall = async () => {
        const response = await menuApi.getCategory({});
        setCategories(response.data.data);
    }

    const menuCall = async () => {
        const response = await menuApi.getMain({});
        setMains(response.data.data);
    }

    const optionCall = async () => {
        // const response = await menuApi.({});
    }

    useEffect(() => {
        apiCall();
        // axios를 이용해 데이터를 가져온다
    }, []);

    // useEffect(() => {
    //     apiCall();
    //     // axios를 이용해 데이터를 가져온다
    // }, [btnClicked]);


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

    const handleCategoryAdd = async (name) => {
        const data = { name };
        console.log(data);
        let response = await menuApi.addCategory(data);
        categoryCall();
        
        // setCategories(newCategory);
    };

    const handleCategoryDelete = category => {
        // const categoryPk = state.category.filter(item => item.id !== category.id)
        // setState({ ...state, category: categoryPk});
    };

    const onCatSubmit = e => {
        e.preventDefault();
        const name = catInputRef.current.value;
        handleCategoryAdd(name);
        setBtnClicked(name);
        catFormRef.current.reset();
    };

    const handleMenuAdd = async (name, price, categoryPk) => {
        let data = new FormData();
        data.append('category_pk', categoryPk);
        data.append('menu_name', name);
        data.append('menu_price', price);
        data.append('menu_soldout', 0);
        let response = await menuApi.newMain(data);
        menuCall();
    };

    const handleMenuDelete = menu => {
        // const main = state.main.filter(item => item.id !== menu.id)
        // setState({ ...state, main});
    };

    const onMenuSubmit = (e, categoryPk) => {
        e.preventDefault();
        const name = e.target[0].value;
        const price = parseInt(e.target[1].value);
        if (isNaN(price)) {
            e.target.reset();
        }
        else {
            handleMenuAdd(name, price, categoryPk);
            setBtnClicked(name);
            e.target.reset();
        }
    };

    const handleImageAdd = menu => {
    };

    const handleOptionAdd = (name, price) => {
        const data = {'option_name': name, 'option_price': price, 'option_soldout': 0};
        console.log(data);
        console.log(menuApi.addOption(data));
    };

    const handleOptionDelete = opt => {
        // const option = state.option.filter(item => item.id !== opt.id)
        // setState({ ...state, option});
    };

    const onOptionSubmit = e => {
        e.preventDefault();
        const name = optionInputRef.current.value;
        const price = parseInt(optionPriceRef.current.value);
        if (isNaN(price)) {
            optionFormRef.current.reset();
        }
        else {
            handleOptionAdd(name, price);
            setBtnClicked(name);
            optionFormRef.current.reset();
        }
    };

    return (
        <div className={styles.menuAdmin}>
            <div className={styles.content}>
                <h1>메뉴 변경</h1>
                <form ref={catFormRef} className={styles.catAddForm} onSubmit={onCatSubmit}>
                    <input ref={catInputRef} type="text" className={styles.catAddInput} placeholder="카테고리 추가" />
                    <button className={styles.catAddBtn}>➕</button>
                </form>
                {categories.map((category) => (
                    <div className={styles.category} key={category.categoryPk}>
                        <p className={styles.categoryName}>[{category.categoryName}]</p>
                        <form className={styles.menuAddForm} onSubmit={(e) => onMenuSubmit(e, category.categoryPk)}>
                            <input type="text" name="menuName" className={styles.menuAddInput} placeholder="메인 메뉴 추가" />
                            <input type="text" name="menuPrice" className={styles.menuAddInput} placeholder="가격" />
                            <button className={styles.menuAddBtn}>➕</button>
                        </form>
                        {getMatchedMains(category, mains).map((main) => (
                            <div className={styles.main} key={main.menuPk}>
                                <p className={styles.mainName}>{main.menuName}</p>
                                <p className={styles.mainPrice}>:{main.menuPrice}원</p>
                                {getMatchedOptions(main, options).map((option) => (
                                    <div className={styles.option} key={option.optionPk}>
                                        <p className={styles.optionName}>{option.optionName}</p>
                                        <p className={styles.optionPrice}>:{option.optionPrice}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.modifyOption}>
                <h1>옵션 변경</h1>
                <form ref={optionFormRef} className={styles.optionAddForm} onSubmit={onOptionSubmit}>
                    <input type="text" ref={optionInputRef} className={styles.optionAddInput} placeholder="옵션 추가" />
                    <input type="text" ref={optionPriceRef} className={styles.optionAddInput} placeholder="가격" />
                    <button className={styles.optionAddBtn}>➕</button>
                </form>
                {options.map((option) => (
                    // css할 때는 className 변경해야 함!
                    <div className={styles.option} key={option.optionPk}>
                        <p className={styles.optionName}>{option.optionName}</p>
                        <p className={styles.optionPrice}>:{option.optionPrice}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuAdmin;