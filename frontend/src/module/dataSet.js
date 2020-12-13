
const SUCCESS = "SUCCESS"
const ERROR = "ERROR"
const LOADING = "LOADING"

export const setSuccess = (data) =>({type: SUCCESS,data})
export const setError = () =>({type: ERROR, error: 'error'})
export const setLoading = () =>({type: LOADING})




const initialState = {
    loading:true,
    data:[],
    error:false
}

// 데이터 api 호출시 비동기 처리를 위한 리듀서들
export default function dataSet(state = initialState, action){
    switch(action.type){
        case LOADING:
            return {
                loading:true,
                data:{},
                error:null
            }
        case SUCCESS:
            return{
                loading:false,
                data:action.data,
                error:null
            }
        case ERROR:
            return{
                loading:false,
                data:{},
                error: action.error
            }
        default:
            return state
    }

}


