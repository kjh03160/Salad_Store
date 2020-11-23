import logo from './logo.svg';
import './App.css';
import React, { useState, Component, useEffect} from 'react';
import api from './api/orderAPI'
import sapi from './api/statisticAPI'

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
    let result2 = await api.getOrders();
    // let result2 = await sapi.test();
    // let result2 = await api.makeOrders(startDate);
    // let result2 = await api.setComplete(42)
    // let result2 = await api.deleteOrder(41)

    // let result2 = await api.makeOrders({'menus' : [{'menuId' : 3, 'options' :[1, 3], 'quantity' : 1}, {'menuId' : 1, 'options' : [], 'quantity' : 1}], 'totalPrice' : 10000})
    
    
    // let result2 = await sapi.getOrders(startDate, endDate)
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
