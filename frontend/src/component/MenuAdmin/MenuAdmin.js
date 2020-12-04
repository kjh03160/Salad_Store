import React, { useState, useEffect } from 'react'
import menuApi from '../../api/saveData';
import styles from './MenuAdmin.module.css';
import { Multiselect } from 'multiselect-react-dropdown';

const MenuAdmin = (props) => {
    // 데이터에 관련된 상태를 선언
    const [relations, setRelations] = useState([]);
    const [mains, setMains] = useState([]);
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    // 추가를 위한 상태를 선언
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isCatOn, setIsCatOn] = useState(false);
    const [isMenuOn, setIsMenuOn] = useState([]);
    const [isOptOn, setIsOptOn] = useState(false);
    const [isSelectorOn, setIsSelectorOn] = useState([]);

    const catInputRef = React.createRef();
    const catFormRef = React.createRef();

    const optionInputRef = React.createRef();
    const optionPriceRef = React.createRef();
    const optionFormRef = React.createRef();

    // 데이터를 동기화시킨다.
    const apiCall = async () => {
        const response = await menuApi.getAll();
        console.log(response.data);
        const { relation, main, option, category } = response.data;
        let menuOnArray = [];
        let selectorOnArray = [];

        category.map(item => {
            const obj = { key: item.categoryPk, status: false };
            menuOnArray.push(obj);
        });

        main.map(item => {
            const obj = { key: item.menuPk, status: false };
            selectorOnArray.push(obj);
        })

        setIsMenuOn(menuOnArray);
        setIsSelectorOn(selectorOnArray);
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
        const data = { category_name: name };
        let response = await menuApi.addCategory(data);
        categoryCall();

        // setCategories(newCategory);
    };

    const handleCategoryDelete = async (e, categoryPk) => {
        // let newCategories = [...categories];
        let data = { 'category_pk': categoryPk };

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
        let data = { 'pk': menuPk };
        let response = await menuApi.deleteMain(data);
        menuCall();
    };

    const onMenuSubmit = (e, categoryPk) => {
        e.preventDefault();
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
        let data = { 'option_pk': optionPk };
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

    //

    const handleCatToggle = () => {
        const isOn = isCatOn;
        setIsCatOn(!isOn);
    };

    const handleMenuToggle = (e, key) => {
        const isOnArray = isMenuOn;
        for (let obj of isOnArray) {
            if (obj.key === key) {
                const nowStatus = obj.status;
                obj.status = !nowStatus;
            }
        }
        setIsMenuOn([...isOnArray]);
    };

    const getMenuOn = (key) => {
        for (let obj of isMenuOn) {
            if (obj.key === key) {
                return obj.status
            }
        }
    }

    const handleOptToggle = () => {
        const isOn = isOptOn;
        setIsOptOn(!isOn);
    };

    const handleSelectorToggle = (e, key) => {
        const isOnArray = isSelectorOn;
        for (let obj of isOnArray) {
            if (obj.key === key) {
                const nowStatus = obj.status;
                obj.status = !nowStatus;
            }
        }
        setIsSelectorOn([...isOnArray]);
    };

    const getSelectorOn = (key) => {
        for (let obj of isSelectorOn) {
            if (obj.key === key) {
                return obj.status
            }
        }
    }



    return (
        <div className={styles.menuAdmin}>
            <div className={styles.title}>
                <h1>메뉴 관리</h1>
            </div>
            <div className={styles.menuAdminContent}>
                <div className={styles.content}>
                    <button onClick={handleCatToggle} className={styles.btn}>
                        <i className="fas fa-plus-square"></i>
                    </button>
                    <div className={styles.handleCategory}>
                        <span className={isCatOn ? styles['hidden'] : styles['catToggle']}>카테고리 추가</span>
                        <form ref={catFormRef} className={isCatOn ? styles['catAddForm'] : styles['hidden']} onSubmit={onCatSubmit}>
                            <input ref={catInputRef} type="text" className={styles.catAddInput} placeholder="카테고리 이름" />
                            <button className={styles.catAddBtn}>✅</button>
                        </form>
                    </div>
                    <br />
                    {categories.map((category) => (
                        <div className={styles.category} key={category.categoryPk}>
                            <p className={styles.categoryName}>[{category.categoryName}]</p>
                            <button className={styles.delBtn} onClick={(e) => { if (window.confirm('해당 카테고리를 삭제하시겠습니까?')) handleCategoryDelete(e, category.categoryPk) }}>
                                <i className="fas fa-trash"></i>
                            </button>
                            <br />
                            <button onClick={(e) => handleMenuToggle(e, category.categoryPk)} className={styles.btn}>
                                <i className="fas fa-plus-square"></i>
                            </button>
                            <div className={styles.handleMenu}>
                                <p className={getMenuOn(category.categoryPk) ? styles['hidden'] : styles['menuToggle']}>메뉴 추가</p>
                                <form className={getMenuOn(category.categoryPk) ? styles['menuAddForm'] : styles['hidden']} onSubmit={(e) => onMenuSubmit(e, category.categoryPk)}>
                                    <input type="text" name="menuName" className={styles.menuAddInput} placeholder="메뉴 이름" />
                                    <input type="text" name="menuPrice" className={styles.menuAddInput} placeholder="가격" />
                                    <input type="file" name="menuImage" className={styles.menuAddInput} />
                                    <button className={styles.menuAddBtn}>✅</button>
                                </form>
                            </div>
                            {getMatchedMains(category, mains).map((main) => (
                                <div className={styles.main} key={main.menuPk}>
                                    {/* <img className={styles.mainImage} src={main.menuImage} /> */}
                                    <p className={styles.mainName}>{main.menuName}</p>
                                    <p className={styles.mainPrice}>: {main.menuPrice}원</p>
                                    <button className={styles.delBtn} onClick={(e) => { if (window.confirm('해당 메뉴를 삭제하시겠습니까?')) handleMenuDelete(e, main.menuPk) }}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                    <br />
                                    <button onClick={(e) => handleSelectorToggle(e, main.menuPk)} className={styles.btn}>
                                        <i className="fas fa-plus-square"></i>
                                    </button>
                                    <div className={styles.handleSelector}>
                                        <p className={getSelectorOn(main.menuPk) ? styles['hidden'] : styles['selectorToggle']}>옵션 선택</p>
                                        <form id={main.menuPk} className={getSelectorOn(main.menuPk) ? styles['optionSelector'] : styles['hidden']} onSubmit={(e) => onSubmit(e, main.menuPk)}>
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
                                    </div>
                                    <div className={styles.matchedOptions}>
                                        {getMatchedOptions(main, options).map((option) => (
                                            <div className={styles.option} key={option.optionPk}>
                                                <p className={styles.optionName}>{option.optionName}</p>
                                                <p className={styles.optionPrice}> : {option.optionPrice}</p>
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className={styles.modifyOption}>
                    <button onClick={handleOptToggle} className={styles.btn}>
                        <i className="fas fa-plus-square"></i>
                    </button>
                    <div className={styles.handleOption}>
                        <p className={isOptOn ? styles['hidden'] : styles['optToggle']}>옵션 추가</p>
                        <form ref={optionFormRef} className={isOptOn ? styles['optionAddForm'] : styles['hidden']} onSubmit={onOptionSubmit}>
                            <input type="text" ref={optionInputRef} className={styles.optionAddInput} placeholder="옵션 이름" />
                            <input type="text" ref={optionPriceRef} className={styles.optionAddInput} placeholder="가격" />
                            <button className={styles.optionAddBtn}>✅</button>
                        </form>
                    </div>
                    {options.map((option) => (
                        // css할 때는 className 변경해야 함!
                        <div className={styles.rightOption} key={option.optionPk}>
                            <p className={styles.rightOptionName}>{option.optionName}</p>
                            <p className={styles.rightOptionPrice}> : {option.optionPrice}</p>
                            <button className={styles.delBtn} onClick={(e) => { if (window.confirm('해당 옵션을 삭제하시겠습니까?')) handleOptionDelete(e, option.optionPk) }}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuAdmin;