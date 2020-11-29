# Salad_Store

안녕 친구들 

아~ 귀찮다

# 카테고리 

## data
<pre><code>
data = {'pk' : ...}로 넣어주면 get과 delete 가능
data = {'name' : ...}로 넣어주면 post 가능
data = {'pk' : ..., 'name" ...}로 넣어주면 patch 가능
</code></pre>


## 코드
<pre><code>
//조회
 getCategory(data){
      let status = axios.get('/category', {params:data})
      return status
    },
</code></pre>

<pre><code>
//삽입
  addCategory(data){
      let status = axios.post('/category', data)
      return status

    },
</code></pre>
<pre><code>
//수정

 changeCategory(data){
      let status = axios.patch('/category', data)
      return status
    },

</code></pre>
<pre><code>
//삭제
  deleteCategory(data){
      let status = axios.delete('/category', {params : data})
      return status
    }
</code></pre>

## return
<pre><code>
{'data' : {'categoryPk' : ..., 'categoryName' : ...}, 'status' : 200}
</code></pre>
status가 404 요청한 값 상태 안 좋음
status가 400 줄 값 없음 이라는 뜻이니 처리 


# 메인 메뉴

## data
<pre><code>
  let form = new FormData();
  //폼에 추가
  form.append('key name', value);
  //폼데이터로 넘겨줘야 파일도 받을 수 있어서 메인은 다 폼으로 부탁드려요 
</code></pre>

사용할 수 있는 키의 종류 
 menu_pk, category_pk, menu_name, menu_price, menu_soldout, menu_description, menu_image 


## code
<pre><code>
//조회
 getMain(data){
      let status = axios.get('/menu', {params:data})
      return status
    },
    //data에 menu_pk를 넣어주면 해당되는 거 찾고 아무것도 없으면 전체 정확히 찾으면 200
</code></pre>
<pre><code>
//삽입
  newMain(data){
      let status = axios.post('/menu', data)
      return status
    },
    //다른 건 없어도 되지만 category_pk가 없을 경우 404 반환 삽입 완료 201
</code></pre>
<pre><code>
//수정
 reviseMeny(data){
      let status = axios.patch('/menu', data)
      return status
    },
    //다른 건 없어도 되지만 menu_pk가 없을 경우 404 반환 수정 완료 204
</code></pre>
<pre><code>
//삭제
  deleteMenu(data){
      let status = axios.delete('/menu', {params : data})
      return status
    }
    //menu_pk가 없다면 400 맞으면 200
</code></pre>

## return
<pre><code>
{data : {'menuPk' : ...
 'categoryPk': ...
 'menuName' :...
 'menuPrice' : ...
 'menuSoldout' : ...
 'menuDescription' : ...
 'menuImage' : ...
 }}
</code></pre>


# 옵션

## 데이터
<pre><code>
data = {'option_pk' : ...}로 넣어주면 get과 delete 가능
data = {'option_name' : ..., 'option_price' : ..., 'option_soldout'}로 넣어주면 post 가능 patch 가능 몇몇의 특성에 값은 없어도 됨
</code></pre>

## 코드

## code
<pre><code>
//조회
 getOption(data){
      let status = axios.get('/option', {params:data})
      return status
    },
    //data에 option_pk를 넣어주면 해당되는 거 찾고 아무것도 없으면 전체 
    //정확히 찾으면 200
</code></pre>
<pre><code>
//삽입
  newOption(data){
      let status = axios.post('/option', data)
      return status
    },
   삽입 완료 201
</code></pre>
<pre><code>
//수정
 reviseOption(data){
      let status = axios.patch('/option', data)
      return status
    },
    //다른 건 없어도 되지만 option_pk가 없을 경우 404 반환 수정 완료 204
</code></pre>
<pre><code>
//삭제
  deleteOption(data){
      let status = axios.delete('/option', {params : data})
      return status
    }
    //option_pk가 없다면 400 맞으면 200
</code></pre>

## 리턴
<pre><code>
{data : {'optionPK' : option.option_pk,
'optionName': option.option_name,
'optionPrice' : option.option_price,
'optionSoldout' : option.option_soldout
 }}
</code></pre>
 
 
