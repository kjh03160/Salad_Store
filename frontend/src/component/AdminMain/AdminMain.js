import React, { useState, useEffect } from 'react';
import api from '../../api/statisticAPI';
import styles from './AdminMain.module.css';

const AdminMain = () => {
    // DB스키마에 맞게 시간 데이터 형태 변환
    const getFormatDate = date => {
        var year = date.getFullYear();
        var month = (1 + date.getMonth());
        month = month >= 10 ? month : '0' + month;
        var day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '-' + month + '-' + day;
    };

    // 데이터를 동기화시킨다.
    const apiCall = async () => {
        const response = await api.getStat(startDate, endDate, null, null); // 안 넣을 때는 false X
        setData(response.data.data[response.data.data.length - 1]);
    };

    // 일간/주간/월간 버튼 클릭 이벤트를 위한 상태
    const [btnClicked, setBtnClicked] = useState("일간");

    // 날짜를 설정하기 위한 상태
    const [startDate, setStartDate] = useState(getFormatDate(new Date()));
    const [endDate, setEndDate] = useState(getFormatDate(new Date()));

    // 출력할 데이터
    const [data, setData] = useState({});

    const DAYTIME = 24 * 60 * 60 * 1000;
    const DateFilterData = [
        {
            id: 1,
            value: "일간",
        },
        {
            id: 2,
            value: "주간",
        },
        {
            id: 3,
            value: "월간",
        },
    ];

    useEffect(() => {
        apiCall();
    }, [startDate, endDate]);

    const onChangeStart = e => {
        setStartDate(e.target.value)
    }
    const onChangeEnd = e => {
        setEndDate(e.target.value)
    }

    // 일간/주간/월간 버튼에 따라 타임필터 적용
    const handleBtnClicked = e => {
        const value = e.target.value;
        setBtnClicked(value);
        const currentDate = new Date();
        if (value === "일간") {
            setStartDate(getFormatDate(new Date()));
            setEndDate(getFormatDate(new Date()));
        }
        if (value === "주간") {
            let aWeekAgo = new Date(currentDate.getTime() - 7 * DAYTIME);
            setStartDate(getFormatDate(aWeekAgo));
            setEndDate(getFormatDate(new Date()));
        }
        if (value === "월간") {
            let aMonthAgo = new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1,
                new Date().getDate()
            );
            setStartDate(getFormatDate(aMonthAgo));
            setEndDate(getFormatDate(new Date()));
        }
    };


    return (
        <>  
            {/* 시간 설정 */}
            <div className={styles.aboutDate}>
                <div className={styles.dateFilterBtns}>
                    {DateFilterData.map((item, i) => (
                        <button className={styles.dateFilterBtn}
                            onClick={handleBtnClicked}
                            key={i}
                            backgroundColor={btnClicked === item.value}
                            value={item.value}
                        >{item.value}</button>
                    ))}
                </div>
                <div className={styles.dateInput}>
                    <input type='date' className={styles.startDate} name={"startDate"} onChange={onChangeStart}
                        value={startDate}></input>
                    <span> ~ </span>
                    <input type='date' className={styles.endDate} name={"endDate"} onChange={onChangeEnd}
                        value={endDate}></input>
                </div>
            </div>
            {/* 출력 */}
            <div className={styles.text}>
                <p>{startDate} ~ {endDate}</p>
                <p>기간 동안의 매출액은 <br /> </p>
                <p><br /></p>
                <p>{Object.keys(data).length != 0 ? data.매출 : 0}원입니다.</p>
            </div>
        </>
    );
};

export default AdminMain