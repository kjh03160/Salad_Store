import React, { useState, useEffect } from 'react';
import menuApi from '../../api/saveData';
import styles from './MenuAdmin.module.css';
import { Multiselect } from 'multiselect-react-dropdown';

const MenuAdmin = (props) => {
    // 데이터에 관련된 상태
    const [relations, setRelations] = useState([]);
    const [mains, setMains] = useState([]);
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    // 입력시 이벤트를 위한 상태
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isCatOn, setIsCatOn] = useState(false);
    const [isMenuOn, setIsMenuOn] = useState([]);
    const [isOptOn, setIsOptOn] = useState(false);
    const [isSelectorOn, setIsSelectorOn] = useState([]);
    // 입력값을 참조하는 데 사용
    const catInputRef = React.createRef();
    const catFormRef = React.createRef();
    const optionInputRef = React.createRef();
    const optionPriceRef = React.createRef();
    const optionFormRef = React.createRef();

    // 데이터를 동기화시킨다.
    const apiCall = async () => {
        const response = await menuApi.getAll();
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
        setRelations(relation);
    }

    // 페이지 최초 로딩시 apiCall함수를 호출
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
    
    // 카테고리 추가&제거
    const handleCategoryAdd = async (name) => {
        const data = { category_name: name };
        let response = await menuApi.addCategory(data);
        categoryCall();
    };

    const handleCategoryDelete = async (e, categoryPk) => {
        let data = { 'category_pk': categoryPk };
        let response = await menuApi.deleteCategory(data);
        categoryCall();
    };

    const onCatSubmit = e => {
        e.preventDefault();
        const name = catInputRef.current.value;
        if (name === "") {
            alert("카테고리 이름을 입력하세요!")
        }
        else {
            handleCategoryAdd(name);
        }
        catFormRef.current.reset();
    };
    //

    // 메뉴 추가&제거
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
        const image = e.target[3].files[0];
        console.log(name);
        // 가격이 정수형이 아닐 때 에러 헨들링
        if (name.length < 1) {
            alert("메뉴 이름을 입력하세요!");
            e.target.reset();
            return;
        }
        if (isNaN(price)) {
            alert("정확한 가격을 입력하세요!");
            e.target.reset();
        }
        else {
            handleMenuAdd(name, price, categoryPk, image);
            e.target.reset();
        }
    };
    //

    // 옵션 추가&제거
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
        if (name === "") {
            alert("옵션 이름을 입력하세요!");
            optionFormRef.current.reset();
            return;
        }
        // 가격이 정수형이 아닐 때 에러 헨들링
        if (isNaN(price)) { 
            alert("정확한 가격을 입력하세요!");
            optionFormRef.current.reset();
        }
        else {
            handleOptionAdd(name, price);
            optionFormRef.current.reset();
        }
    };
    //

    // 옵션-메뉴 연결 및 제거
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

    const handleMatchedOptionDelete = async (e, menuPk, optionPk) => {
        let response = await menuApi.deleteLink({menu_pk:menuPk, option_pk:optionPk});
        optionCall();
    };
    //

    // 입력 시 이벤트 처리
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
    //



    return (
        <div className={styles.menuAdmin}>
            <div className={styles.title}>
                <h1>메뉴 관리</h1>
            </div>
            {/* 카테고리&메뉴 관리 + 옵션 선택 */}
            <div className={styles.menuAdminContent}> 
                <div className={styles.content}>
                    <button onClick={handleCatToggle} className={styles.btn}>
                        <i className="fas fa-plus-square"></i>
                    </button>
                    <div className={styles.handleCategory}>
                        <span className={isCatOn ? styles['hidden'] : styles['catToggle']}>카테고리 추가</span>
                        <form ref={catFormRef} className={isCatOn ? styles['catAddForm'] : styles['hidden']} onSubmit={onCatSubmit}>
                            <input ref={catInputRef} type="text" className={styles.catAddInput} placeholder="카테고리 이름" />
                            <button className={styles.addBtn}>
                                <i class="fas fa-check-square"></i>
                            </button>
                        </form>
                    </div>
                    <br />
                    {/* 카테고리 */}
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
                                    <button className={styles.addBtn}>
                                        <i class="fas fa-check-square"></i>
                                    </button>
                                    <label className={styles.uploadIcon} htmlFor="inputFile">
                                        <input type="file" id="inputFile" name="menuImage" className={styles.inputFile} />
                                        <i class="fas fa-cloud-upload-alt"></i>
                                    </label>
                                </form>
                            </div>
                            {/* 각 카테고리에 해당하는 메인 메뉴 */}
                            {getMatchedMains(category, mains).map((main) => (
                                <div className={styles.main} key={main.menuPk}>
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
                                                options={options} 
                                                onSelect={onSelect} 
                                                placeholder="옵션을 선택해주세요"
                                                onRemove={onRemove}
                                                displayValue="optionName"
                                                showCheckbox={true}
                                            />
                                            <button className={styles.addBtn}>
                                                <i class="fas fa-check-square"></i>
                                            </button>
                                        </form>
                                    </div>
                                    {/* 각 메인 메뉴에 해당하는 옵션 */}
                                    <div className={styles.matchedOptions}>
                                        {getMatchedOptions(main, options).map((option) => (
                                            <div className={styles.option} key={option.optionPk}>
                                                <p className={styles.optionName}>{option.optionName}</p>
                                                <p className={styles.optionPrice}> : {option.optionPrice}원</p>
                                                <button className={styles.delBtn} onClick={(e) => { if (window.confirm('선택된 옵션을 삭제하시겠습니까?')) handleMatchedOptionDelete(e, main.menuPk, option.optionPk) }}>
                                                    <i class="fas fa-times-circle"></i>
                                                </button>
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {/* 옵션 관리 */}
                <div className={styles.modifyOption}>
                    <div className={styles.optionContent}>
                        <button onClick={handleOptToggle} className={styles.btn}>
                            <i className="fas fa-plus-square"></i>
                        </button>
                        <div className={styles.handleOption}>
                            <span className={isOptOn ? styles['hidden'] : styles['optToggle']}>옵션 추가</span>
                            <form ref={optionFormRef} className={isOptOn ? styles['optionAddForm'] : styles['hidden']} onSubmit={onOptionSubmit}>
                                <input type="text" ref={optionInputRef} className={styles.optionAddInput} placeholder="옵션 이름" />
                                <input type="text" ref={optionPriceRef} className={styles.optionAddInput} placeholder="가격" />
                                <button className={styles.addBtn}>
                                    <i class="fas fa-check-square"></i>
                                </button>
                            </form>
                        </div>
                        <br />
                        {options.map((option) => (
                            <div className={styles.rightOption} key={option.optionPk}>
                                <p className={styles.rightOptionName}>{option.optionName}</p>
                                <p className={styles.rightOptionPrice}> : {option.optionPrice}원</p>
                                <button className={styles.delBtn} onClick={(e) => { if (window.confirm('해당 옵션을 삭제하시겠습니까?')) handleOptionDelete(e, option.optionPk) }}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        ))}
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuAdmin;