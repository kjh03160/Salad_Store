// const SET_MAIN = "SET_MAIN"
const SET_ORDER = 'SET_ORDER'

// export const setMain = (mainChosen,orderId) => ({ type:SET_MAIN,mainChosen, orderId })
export const setOrder = (menuChosen) => ({ type:SET_ORDER,menuChosen })

const initialState = [

]
export default function order(state = initialState, action){
    switch(action.type){
        case SET_ORDER:
            return[
                ...state,
                action.menuChosen
            ]
        default:
            return state

    }
}