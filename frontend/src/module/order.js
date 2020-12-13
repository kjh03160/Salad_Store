// const SET_MAIN = "SET_MAIN"
const SET_ORDER = 'SET_ORDER'
const QUANTITY_INCREMENT = 'QUANTITY_INCREMENT'
const QUANTITY_DECREMENT = "QUANTITY_DECREMENT"
const DELETE_OPTION = "DELETE_OPTION"
const DELETE_ORDER = 'DELETE_ORDER'
const CANCEL_ORDER = "CANCEL_ORDER"


export const setOrder = (menuChosen) => ({ type:SET_ORDER,menuChosen })
export const qunatityIncrement = (orderId)=> ({type:QUANTITY_INCREMENT, orderId})
export const qunatityDecrement = (orderId)=> ({type:QUANTITY_DECREMENT, orderId})
export const deleteOption = (orderId, optionId) => ({type:DELETE_OPTION, orderId,optionId})
export const deleteOrder = (orderId)=> ({type:DELETE_ORDER, orderId})
export const cancelOrder = () => ({type:CANCEL_ORDER})

const initialState = [
    // 데이터 형식
    // {
    //     orderId:1,
    //     mainId : id,
    //     main:name,
    //     mainQuantity:1,
    //     mainPrice:price,
        // optionList:[
        //     {
        //         optionId:id,
        //         optionName:name,
        //         optionPrice:optionPrice
        //     }
        // ]       
    // }
]
// 주문 상태 관리 관련 리듀서들
export default function order(state = initialState, action){
    switch(action.type){
        case QUANTITY_INCREMENT:
            return(
                state.map(
                    order=>
                    order.orderId === action.orderId
                    ?{...order, mainQuantity:order.mainQuantity+1}
                    :(order)
                ))
        case QUANTITY_DECREMENT:
            return(
                state.map(
                    order=>
                    (order.orderId === action.orderId)?
                    ((order.mainQuantity - 1 > 0)? 
                        ({...order, mainQuantity:order.mainQuantity-1})
                        :(order))
                    :(order)
                )) 
        case DELETE_OPTION:
            return(
                state.map(
                    (order)=>
                        (order.orderId === action.orderId)?
                        ({...order, optionList: order.optionList.filter(function
                            (option) {return option.optionId!=action.optionId}
                        )}):(order)    
                )
            )
        case DELETE_ORDER:
            return(
                state.filter((order)=>order.orderId != action.orderId)
            )
        case SET_ORDER:
            return[
                ...state,
                action.menuChosen
            ]
        case CANCEL_ORDER:
            return ([

            ])
        default:
            return state

    }
}

