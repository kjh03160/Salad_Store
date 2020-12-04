import React, { useState, useEffect } from 'react'
import menuApi from '../../api/saveData';
import styles from './MenuAdmin.module.css';
import { Multiselect } from 'multiselect-react-dropdown';

const MenuAdmin = (props) => {
    const [relations, setRelations] = useState([]);
    const [mains, setMains] = useState([]);
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

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
        const response = await menuApi.getAll();
        const { relation, main, option, category } = response.data;
        setOptions(option);
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
        const data = { category_name:name };
        console.log(data);
        let response = await menuApi.addCategory(data);
        categoryCall();

        // setCategories(newCategory);
    };

    const handleCategoryDelete = async (e, categoryPk) => {
        // let newCategories = [...categories];
        let data = {'category_pk': categoryPk};
        
        let response = await menuApi.deleteCategory(data);
        categoryCall();
    };

    const onCatSubmit = e => {
        e.preventDefault();
        const name = catInputRef.current.value;
        handleCategoryAdd(name);
        catFormRef.current.reset();
    };

    const handleMenuAdd = async (name, price, categoryPk, image) => {
        let data = new FormData();
        data.append('category_pk', categoryPk);
        data.append('menu_name', name);
        data.append('menu_price', price);
        data.append('menu_soldout', 0);
        data.append('image', image);
        let response = await menuApi.newMain(data);
        menuCall();
    };

    const handleMenuDelete = async (e, menuPk) => {
        let data = {'pk': menuPk};
        let response = await menuApi.deleteMain(data);
        menuCall();
    };

    const onMenuSubmit = (e, categoryPk) => {
        e.preventDefault();
        console.log(e);
        const name = e.target[0].value;
        const price = parseInt(e.target[1].value);
        const image = e.target[2].files[0];
        if (isNaN(price)) {
            e.target.reset();
        }
        else {
            handleMenuAdd(name, price, categoryPk, image);
            e.target.reset();
        }
    };

    const handleOptionAdd = async (name, price) => {
        const data = { 'option_name': name, 'option_price': price, 'option_soldout': 0 };
        let response = await menuApi.addOption(data);
        optionCall();
    };

    const handleOptionDelete = async (e, optionPk) => {
        let data = {'option_pk': optionPk};
        let response = await menuApi.deleteOption(data);
        optionCall();
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
            optionFormRef.current.reset();
        }
    };

    // 옵션 선택 event 처리

    const onSubmit = async (e, menuPk) => {
        const newRelation = [...relations];
        selectedOptions.map(function (option) {
            // console.log({option_pk: option.optionPk, menu_pk: menuPk})
            menuApi.newLink({ option_pk: option.optionPk, menu_pk: menuPk });
            newRelation.push({ menuPk, optionPk: option.optionPk });
        });
        setRelations(newRelation);
        optionCall();
    };

    const onSelect = (selectedList, selectedItem) => {
        setSelectedOptions([...selectedList]);
    };

    const onRemove = (selectedList, selectedItem) => {
        setSelectedOptions([...selectedList]);
    };

    return (
        <div className={styles.menuAdmin}>
            <div className={styles.content}>
                <h1>메뉴 변경</h1>
                <form ref={catFormRef} className={styles.catAddForm} onSubmit={onCatSubmit}>
                    <input ref={catInputRef} type="text" className={styles.catAddInput} placeholder="카테고리 추가" />
                    <button className={styles.catAddBtn}>➕</button>
                </form>
                <br />
                {categories.map((category) => (
                    <div className={styles.category} key={category.categoryPk}>
                        <p className={styles.categoryName}>[{category.categoryName}]</p>
                        <button onClick={(e) => { if (window.confirm('해당 카테고리를 삭제하시겠습니까?')) handleCategoryDelete(e, category.categoryPk) }}>❌</button>
                        <form className={styles.menuAddForm} onSubmit={(e) => onMenuSubmit(e, category.categoryPk)}>
                            <input type="text" name="menuName" className={styles.menuAddInput} placeholder="메인 메뉴 추가" />
                            <input type="text" name="menuPrice" className={styles.menuAddInput} placeholder="가격" />
                            <input type="file" name="menuImage" className={styles.menuAddInput}/>
                            <button className={styles.menuAddBtn}>➕</button>
                        </form>
                        <br />
                        {getMatchedMains(category, mains).map((main) => (
                            <div className={styles.main} key={main.menuPk}>
                                <p className={styles.mainName}>{main.menuName}</p>
                                <p className={styles.mainPrice}>:{main.menuPrice}원</p>
                                <img className={styles.mainImage} src={main.menuImage}/>
                                <button onClick={(e) => { if (window.confirm('해당 메뉴를 삭제하시겠습니까?')) handleMenuDelete(e, main.menuPk) }}>❌</button>
                                <form id={main.menuP} action="" onSubmit={(e) => onSubmit(e, main.menuPk)}>
                                    <Multiselect
                                        options={options} // Options to display in the dropdown
                                        onSelect={onSelect} // Function will trigger on select event
                                        placeholder="옵션을 선택해주세요"
                                        onRemove={onRemove} // Function will trigger on remove event
                                        displayValue="optionName" // Property name to display in the dropdown options
                                        showCheckbox={true}
                                    />
                                    <button className={styles.optionAddBtn}>✅</button>
                                </form>
                                {/* <form className={styles.optionAddForm}>
                                    👦옵션 추가하기<br />
                                    {options.map((option) => (
                                        <label><input type="checkbox" value={option.optionPK} />{option.optionName}</label>
                                    ))}
                                    <button className={styles.optionAddBtn}>➕</button>
                                </form> */}
                                🙅이미 있는 옵션
                                {getMatchedOptions(main, options).map((option) => (
                                    <div className={styles.option} key={option.optionPk}>
                                        <p className={styles.optionName}>{option.optionName}</p>
                                        <p className={styles.optionPrice}>:{option.optionPrice}</p>
                                        <br />
                                    </div>
                                ))}
                            </div>
                        ))}
                        <br />
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
                        <button onClick={(e) => { if (window.confirm('해당 옵션을 삭제하시겠습니까?')) handleOptionDelete(e, option.optionPk) }}>❌</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuAdmin;