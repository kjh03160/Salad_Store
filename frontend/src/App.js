import logo from './logo.svg';
import './App.css';
import React, {useState, Component, useEffect} from 'react';
import api from './api/saveData'

export default function App() {
  const [usertext1, setUserText1] = useState('');
  const [usertext2, setUserText2] = useState('');
  const [usertext3, setUserText3] = useState('');
  const [usertext4, setUserText4] = useState('');
  const [usertext5, setUserText5] = useState('');

  const [img, setImage] = useState(null);

  const save = async () => {
    // e.preventDefault를 왜 안하지?
    let form = new FormData();
    // // dictionary 형태로 한번에 담아서 보내기
    // // console.log(img.name)
    form.append('category_pk', 14);
    form.append('menu_name', usertext2);
    form.append('menu_price', 20);
    form.append('menu_soldout', 1);
    form.append('menu_description', usertext5);
    form.append('image',img)
    for (var key of form.values()){
      console.log(key);
    }
    let result2 = await api.getMain({'pk':3});
    // let result2 = await api.newMain({'text1' : usertext1, 'text2' : usertext2, 'image':img});
    // let result2 = await api.newMain(form)
    // let result2 = await api.changeMain(form);
    // let result2 = await api.reviseMain(form);
    // let result2 = await api.addCategory({'name': "category4"})
    // let result2 = await api.changeCategory({'name': "change", 'pk' : 4})
    // let result2 = await api.getCategory({'pk':4})
    // let result2 = await api.deleteCategory({'pk': 4})

    // let result2 = await api.deleteMain(1);

    console.log(result2)



  }
  
  const setText1 = (e) => {
    setUserText1(e.target.value);
  }

  const setText2 = (e) => {
    setUserText2(e.target.value);
  }
  const setText3 = (e) => {
    setUserText3(e.target.value);
  }
  const setText4 = (e) => {
    setUserText4(e.target.value);
  }
  const setText5 = (e) => {
    setUserText5(e.target.value);
  }

  const onChange = (e) => {
    setImage(e.target.files[0]);
    
  }


  return (
      <>
          <input type = "text" name = "text1" onChange = {setText1}/>
          <input type = "text"  name = "text2" onChange = {setText2}/>
          <input type = "text"  name = "text3" onChange = {setText3}/>
          <input type = "text"  name = "text4" onChange = {setText4}/>
          <input type = "text"  name = "text5" onChange = {setText5}/>
          <input type="file" name="file" id="" onChange = {onChange} />
          <button onClick={save} value = "ok"/>
          <img src = "http://localhost:5000/static/images/main/img2.jpg"></img>
      </>
  );
}


