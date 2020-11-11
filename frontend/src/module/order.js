const SET_MAIN = "SET_MAIN"
const SET_OPTION = 'SET_OPTION'

export const setMain = (mainChosen) => ({ type:SET_MAIN,mainChosen })
export const setOption = (optionChosen) => ({ type:SET_OPTION,optionChosen })

const initialState = {
    mainChosen:[],
    optionChosen:[],

}
export default function order(state = initialState, action){
    switch(action.type){
        case SET_MAIN:
            return{
                ...state,
                mainChosen: [...state.mainChosen, action.mainChosen]
            }
        case SET_OPTION:
            return{
                ...state,
                optionChosen:[...state.optionChosen, action.optionChosen]
            }
        default:
            return state

    }
}