# Salad_Store

안녕 친구들 

아~ 귀찮다


#카테고리 

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
