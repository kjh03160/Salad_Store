import React from 'react'
import { useAsync } from 'react-async'
import styled, { css } from 'styled-components'
import MenuAPI from '../api/saveData'
const Wrapper = styled.section`
  width:45%;
  height:100%;
  border:1px solid black;
  background-color:#dcdcdc;
  h2{
    font-size:40px;
  }
  h3{
    font-size:30px;
    text-indent: 1em;
  }
  padding-left:1%;
  
overflow-y:auto;
border:1px solid black;
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #2f3542;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}
::-webkit-scrollbar-track {
  background-color: grey;
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}
`
const Text = styled.div`
  color: #495057;
  cursor: pointer;
  text-indent: 3em;
  margin-top:1%;
  margin-bottom:2%;
  ${props =>
    props.SoldOut &&
    css`
    color: red;
    text-decoration:line-through;
  `}



  .tasks-list-item {
    display: block;
    line-height: 24px;
    padding: 12px 15px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .tasks-list-item + .tasks-list-item {
    border-top: 1px solid #f0f2f3;
  }
  
  .tasks-list-cb {
    display: none;
  }
  
  .tasks-list-mark {
    position: relative;
    display: inline-block;
    vertical-align: center;
    margin-left: 12px;
    width: 20px;
    height: 20px;
    border: 2px solid white;
    // border-radius: 12px;
  }
  
  .tasks-list-mark:before {
    content: '';
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -5px 0 0 -6px;
    height: 4px;
    width: 8px;
    border: solid white;
    border-width: 0 0 4px 4px;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  
  .tasks-list-cb:checked ~ .tasks-list-mark {
    border-color: white;
    background-color: red;
  }
  
  .tasks-list-cb:checked ~ .tasks-list-mark:before {
    display: block;
  }
  
  .tasks-list-desc {
    font-weight: bold;
    color: #8a9a9b;
  }
  
  .tasks-list-cb:checked ~ .tasks-list-desc {
    color: #34bf6e;
    text-decoration: line-through;
  }




`

const Butt = styled.button`
font-size:15px;
:hover {
  background: #464646	;
  color:white;
}
    padding: 10px;
    color: black;
    border: 2px solid white;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease-out;
    font-weight:bold;
    ${props =>
    props.SoldOut &&
    css`
      color: red;
      text-decoration:line-through;
    `}

`
async function getMenu() {
  const response = await MenuAPI.getAll()
  return response.data
}

export default function SoldOutMenuContainer() {
  const { data, error, isLoading, reload } = useAsync({
    promiseFn: getMenu
  })

  async function handleMainClick(menuPk) {
    let response = await MenuAPI.setSoldout({ pk: menuPk, type: "main_soldout" })
    reload()
    return response
  }
  async function handleOptionClick(optionPk) {
    let response = await MenuAPI.setSoldout({ pk: optionPk, type: "option_soldout" })
    reload()
    return response
  }

  if (isLoading) return <div>loading</div>
  return (
    <Wrapper>
      <h2>메뉴 품절 관리 </h2>
      {data.category.map((category) =>
        <div>
          <h3>{category.categoryName}</h3>

          {data.main.filter((main) => main.categoryPk == category.categoryPk).map(
            (main, index) =>
              <Text class="box" onClick={() => handleMainClick(main.menuPk)} ><Butt class="button" key={index} SoldOut={main.menuSoldout} > {main.menuName}</Butt>
                {main.menuSoldout === 0 ?
                  <input type="checkbox" name="task_1" value="1" class="tasks-list-cb" ></input>
                  : <input type="checkbox" name="task_1" value="1" class="tasks-list-cb" checked></input>}
                <span class="tasks-list-mark"></span>  </Text>


          )}

        </div>
      )}
      <h2>옵션 품절 관리</h2>
      {data.option.map((option, index) => <Text class="box" onClick={() => handleOptionClick(option.optionPk)} ><Butt class="button" key={index} SoldOut={option.optionSoldout} > {option.optionName}</Butt>
        {option.optionSoldout === 0 ?
          <input type="checkbox" name="task_1" value="1" class="tasks-list-cb" ></input>
          : <input type="checkbox" name="task_1" value="1" class="tasks-list-cb" checked></input>}
        <span class="tasks-list-mark"></span>  </Text>)}


    </Wrapper>

  )
}
