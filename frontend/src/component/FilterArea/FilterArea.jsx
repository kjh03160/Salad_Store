import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import styles from './FilterArea.module.css';
import api from '../../api/statisticAPI';
// import getDate from 'date-fns/getDate';
// import getYear from 'date-fns/getYear';
// import getMonth from 'date-fns/getMonth';


const FilterArea = () => {

    // yyyy-mm-dd 포맷으로 반환하는 함수
    const getFormatDate = date => {
        var year = date.getFullYear();
        var month = (1 + date.getMonth());
        month = month >= 10 ? month : '0' + month;
        var day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '-' + month + '-' + day;
    };

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

    const [btnClicked, setBtnClicked] = useState("일간");
    const [startDate, setStartDate] = useState(getFormatDate(new Date()));
    const [endDate, setEndDate] = useState(getFormatDate(new Date()));
    const DAYTIME = 24 * 60 * 60 * 1000;

    const handleBtnClicked = e => {
        const value = e.target;
        setBtnClicked(value);
        const currentDate = new Date();

        if (value === "일간") {
            setStartDate(getFormatDate(new Date()));
            setEndDate(getFormatDate(new Date()));
        }
        if (value === "주간") {
            let aWeekAgo = new Date(currentDate().getTime() - 7 * DAYTIME);
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

    const apiCall = async () => {
        const response = await api.getStat(startDate, endDate, null, true); // 안 넣을 때는 false X
        console.log(response.data);
    }
    return (
        <div className="{styles.filterSection}">
            <DatePicker
                dateFormatCalendar="yyyy-MM-dd"
            />
                간편 날짜 설정 버튼 목록
            <div className="{styles.simpleDateBtn}">
                {DateFilterData.map((el, idx) => (
                    <button className="{styles.dateInput}"
                        onClick={handleBtnClicked}
                        key={idx}
                        backgroundColor={btnClicked === el.value}
                        value={el.value}
                    />
                ))}
            </div>
            <DatePicker
                selected={startDate}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setStartDate(date)}
                placeholderText="클릭해주세요."
            />
            <span className="betweenDate"> ~ </span>
            <DatePicker
                selected={endDate}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setEndDate(date)}
                placeholderText="클릭해주세요."
            />
        </div >
    );
};



export default FilterArea;