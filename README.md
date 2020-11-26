# Salad_Store

안녕 친구들 

아~ 귀찮다

## data
<pre><code>
data = {'pk' : ...}로 넣어주면 get과 delete 가능
data = {'name' : ...}로 넣어주면 post 가능
data = {'pk' : ..., 'name" ...}로 넣어주면 patch 가능
</code></pre>

# 카테고리 

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

