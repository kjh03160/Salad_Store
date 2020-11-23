import logo from './logo.svg';
import './App.css';
import React, {useState, Component, useEffect} from 'react';
import api from './api/saveData'

export default function App() {
  const [usertext1, setUserText1] = useState('');
  const [usertext2, setUserText2] = useState('');
  const [img, setImage] = useState(null);

  const save = async () => {
    // e.preventDefault를 왜 안하지?
    let form = new FormData();
    // // dictionary 형태로 한번에 담아서 보내기
    // // console.log(img.name)
    form.append('text1', usertext1);
    form.append('text2', usertext2);
    form.append('image',img)
    for (var key of form.values()){
      console.log(key);
    }
    // let result2 = await api.getMain();
    // let result2 = await api.newMain({'text1' : usertext1, 'text2' : usertext2, 'image':img});
    // let result2 = await api.newMain(form)
    // let result2 = await api.changeMain(form);
    let result2 = await api.reviseMain(form);

    // let result2 = await api.deleteMain(1);

    console.log(result2)



  }
  
  const setText1 = (e) => {
    setUserText1(e.target.value);
  }

  const setText2 = (e) => {
    setUserText2(e.target.value);
  }

  const onChange = (e) => {
    setImage(e.target.files[0]);
    
  }


  return (
      <>
          <input type = "text" name = "text1" onChange = {setText1}/>
          <input type = "text"  name = "text2" onChange = {setText2}/>
          <input type="file" name="file" id="" onChange = {onChange} />
          <button onClick={save} value = "ok"/>
          <img src = "http://localhost:5000/static/images/main/img1.jpg"></img>
      </>
  );
}


