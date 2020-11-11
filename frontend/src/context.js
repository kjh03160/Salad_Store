import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

const StateContext = React.createContext();
export default function StateProvider({children}) {
    const data = useSelector(state=>({
        authenticated : state.auth.authenticated,
        menuChosen: state.order.menuChosen,
        optionChosen:state.order.optionChosen
    }))
    return (
        <StateContext.Provider value={{data}}>{children}</StateContext.Provider>
    )
}
