import * as actionTypes from "../actions/actionTypes";
const initialState = {
    orderArr: [],
    selectedOrder: null,
    updateOrder: null
}
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_ADDED:
            return {
                ...state,
                orderArr: [...state.orderArr, action.payload]
            }
        case actionTypes.CUSTOMER_DELETED:
            let arr = state.orderArr.filter(p => p._id !== action.payload)
            return {
                ...state,
                orderArr:arr

            }
        case actionTypes.ORDER_UPDATED:
            return {
                ...state,
                updateOrder: action.payload
            }
        case actionTypes.ORDER_SELECTED:
            return {
                ...state,
                selectedOrder: action.payload
            }
    }
    return state;
}