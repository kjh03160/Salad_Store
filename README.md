# Salad_Store

# REST API 사용법
-----

## API List
- [주문API](#주문API)
- [매출통계 API](#매출API)
- [카테고리 API](#카테고리)


-----

## 주문API (**`pip install pandas` 선행!**)

| Request type  | Description |
|---------------|-------------|
| **`GET`**         | 주문 데이터 얻기(completed가 False 인 것만) |
| **`POST`**        | 주문 데이터 생성 |
| **`PATCH`**      | 조리 완료 설정 |
| **`DELETE`**     | 주문 데이터 삭제 -> 사용 X! |

---
### 사용 예제

#### GET (return status 200 / 404)
1. 특정 주문 데이터 조회(pk 값 없으면 404 에러) : 

```js
axios.get("/orders", {params:{pk:int}})
```


2. 전체 주문 데이터 조회 (당일 주문만) : 
```js
axios.get("/orders")
```


- return 

```json

{"data" : {"OrderList" : [ {
                        "order_pk": 43, 
                        "order_time" : "2020-11-15 18:24:49", 
                        "menus": [{"product_pk": 9, "menu_name": "리코타 샐러드", "quantity": 1, "options": ["닭가슴살", "계란"]}]
                        }, ...
                      ] } }              
``` 


#### POST (return status 201 / 400)
- 주문 데이터 삽입 (totalPrice는 꼭 리액트에서 계산해서!)
    - 데이터 예시 (형식 안맞으면 400 에러)
    
    ```json
        {
           "menus":[
                      {
                         "menuId":3,
                         "options":[1, 3],
                         "quantity":1
                      },
                      {
                         "menuId":1,
                         "options":[],
                         "quantity":2
                      }
                   ],
           "totalPrice":10000
        }
        
         
- **API 콜**
```js
axios.post('/orders', {data:data})
```

#### PATCH (return status 204 / 404)
- 조리 완료 (completed = True), (pk 값 없으면 404 에러)
    - **`orderPK(int)`는 필수로!**
    
```js
axios.patch('/orders', {pk:orderPk})
```

#### DELETE (return status 204)
- 주문 데이터 삭제 (일단 만들기 했지만, 사용 X), (pk 값 없으면 404 에러)
```js
axios.delete('/orders', {params:{pk:orderPk}})
```

------
## 매출API

| Request type  | Description |
|---------------|-------------|
| **`GET`**         | 매출 데이터 얻기 |

#### GET (return status 200)
- completed가 True 인 것만
- **날짜 범위 맞지 않는 것은 리액트에서 처리해서!**


1. 전체 매출 데이터 조회: 

```js
axios.get("/statistics", {params:{startDate : startDate, endDate : endDate})
```

- return 예시
```json
{"data" : [
            {"날짜": "2020-11-15", "주문 건수": 1, "매출": 10000},
            ..., 
            {"날짜": "총합", "주문 건수": 1, "매출": 10000}
            ] }
```


2. 메뉴 매출 데이터 조회: 
```js
axios.get("/statistics", {params:{startDate : startDate, endDate : endDate, menu : true})
```
- return 예시
```json
{"data" : [
            {"메뉴": "리코타 샐러드", "개수": 3, "매출": 18000},
            {"메뉴": "목살 샐러드", "개수": 3, "매출": 18000},
            ...,
            {"메뉴": "총 합", "개수": 6, "매출": 36000},
            ] }
```


3. 옵션 매출 데이터 조회
```js
axios.get("/statistics", {params:{startDate : startDate, endDate : endDate, option : true})
```
- return 예시
```json
{"data" : [
             {"옵션": "계란", "개수": 1, "매출": 500},
            {"옵션": "닭가슴살", "개수": 4, "매출": 6000},
            {"옵션": "목살", "개수": 1, "매출": 2000},
            ...,
            {"옵션": "총 합", "개수": 6, "매출": 12000}
            ] }
```

------------

# 모든 get 메소드에 아무런 데이터 안 보내면 전체 데이터 반환 (Category, Menu, Option)

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

------------
## Status codes

The API is designed to return different status codes according to context and
action. This way, if a request results in an error, the caller is able to get
insight into what went wrong.

The following table gives an overview of how the API functions generally behave.

| Request type  | Description |
|---------------|-------------|
| `GET`         | Access one or more resources and return the result as JSON. |
| `POST`        | Return `201 Created` if the resource is successfully created and return the newly created resource as JSON. |
| `GET` / `PUT` | Return `200 OK` if the resource is accessed or modified successfully. The (modified) result is returned as JSON. |
| `DELETE`      | Returns `204 No Content` if the resource was deleted successfully. |

The following table shows the possible return codes for API requests.

| Return values            | Description |
|--------------------------|-------------|
| `200 OK`                 | The `GET`, `PUT` or `DELETE` request was successful, the resource(s) itself is returned as JSON. |
| `204 No Content`         | The server has successfully fulfilled the request and that there is no additional content to send in the response payload body. |
| `201 Created`            | The `POST` request was successful and the resource is returned as JSON. |
| `304 Not Modified`       | Indicates that the resource has not been modified since the last request. |
| `400 Bad Request`        | A required attribute of the API request is missing, e.g., the title of an issue is not given. |
| `401 Unauthorized`       | The user is not authenticated, a valid [user token](#authentication) is necessary. |
| `403 Forbidden`          | The request is not allowed. For example, the user is not allowed to delete a project. |
| `404 Not Found`          | A resource could not be accessed. For example, an ID for a resource could not be found. |
| `405 Method Not Allowed` | The request is not supported. |
| `409 Conflict`           | A conflicting resource already exists. For example, creating a project with a name that already exists. |
| `412`                    | Indicates the request was denied. May happen if the `If-Unmodified-Since` header is provided when trying to delete a resource, which was modified in between. |
| `422 Unprocessable`      | The entity could not be processed. |
| `429 Too Many Requests`  | The user exceeded the [application rate limits](../administration/instance_limits.md#rate-limits). |
| `500 Server Error`       | While handling the request, something went wrong server-side. |

