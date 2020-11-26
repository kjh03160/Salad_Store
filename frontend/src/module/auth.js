const SET_DIFF =  'SET_DIFF'
const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
const SET_LOGOUT = "SET_LOGOUT"

export const setDiff =(name,change) => ({type:SET_DIFF, name,change})
export const setAuthenticated = (change) =>({type:SET_AUTHENTICATED, change})
export const setLogout = () =>({type:SET_LOGOUT})

const initialState = {
    email:'',
    password:'',
    authenticated:false,
    isStaff:false,
    user:''
}

export default function auth(state=initialState, action){
    switch(action.type){
        case SET_DIFF:
            return{
                ...state,
                [action.name]:action.change,
            }
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated:!state.authenticated,
                user:action.change.name
            }
        case SET_LOGOUT:
            return{
                ...state,
                authenticated: !state.authenticated,
                user:""
            }
        default:
            return state
    }
}