import React, {useState} from 'react';
import api from '../../api/statisticAPI';

const AdminMain = () => {
    // let startDate = new Date('2020-11-2 14:00');
    // let endDate = new Date('2020-11-2 20:00');
    // startDate.setHours(startDate.getHours()+9);
    // endDate.setHours(endDate.getHours()+9);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
  
    
    const onChangeStart = (e) => {
      setStartDate(e.target.value)
    }
    const onChangeEnd = (e) => {
      setEndDate(e.target.value)
    }
    
    console.log(startDate, endDate)

    const apiCall = async () => {
        const response = await api.getStat(startDate, endDate);
        console.log(response);
    }

    return (
    <div>
      시작날짜
      <input type='date' name={"startDate"} onChange={onChangeStart}
            value={startDate}></input><br>
      </br>
      끝날짜
      <input type='date' name={"endDate"} onChange={onChangeEnd}
            value={endDate}></input><br>
      </br>

      <button onClick={apiCall}>ㅇㅋ</button>
    </div>
    );
};

export default AdminMain;