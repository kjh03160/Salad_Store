import logo from './logo.svg';
import './App.css';
import React, { useState, Component, useEffect} from 'react';
import api from './api/orderAPI'

function App() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  
  const onChangeStart = (e) => {
    setStartDate(e.target.value)
  }
  const onChangeEnd = (e) => {
    setEndDate(e.target.value)
  }
  console.log(startDate, endDate)
  const getOrders = async () =>{
    // let result = await api.getOrders(startDate, endDate);

    let result2 = await api.makeOrders({'menus' : [{'menuId' : 2, 'options' :[1, 2, 3]}, {'menuId' : 3, 'options' : [1]}], 'total' : 10000})
    console.log(result2)
  }

  return (
    <div className="App">
      시작날짜
      <input type='date' name={"startDate"} onChange={onChangeStart}
            value={startDate}></input><br>
      </br>
      끝날짜
      <input type='date' name={"endDate"} onChange={onChangeEnd}
            value={endDate}></input><br>
      </br>

      <button onClick={getOrders}>ㅇㅋ</button>
    </div>
  );
}

export default App;
