const SUCCESS = "SUCCESS"
const ERROR = "ERROR"
const LOADING = "LOADING"

export const setSuccess = () =>({type: SUCCESS, data:{a:1}})
export const setError = () =>({type: ERROR, error: 'error'})
export const setLoading = () =>({type: LOADING})

const initialState = {
    loading:false,
    data:null,
    error:false
}

export default function (state = initialState, action){
    switch(action.type){
        case LOADING:
            return {
                loading:true,
                data:null,
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
                data:null,
                error: action.error
            }
        default:
            throw new Error(`unhandled action type: ${action.type} `)
    }

}

