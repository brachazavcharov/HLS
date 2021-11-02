import * as actionTypes from "../actions/actionTypes";
const initialState = {
    customerArr: [],
    selectedCustumer: null,
    updateCustomer: null
}
export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CUSTOMER_ADDED: {
            let arr = [...state.customerArr, action.payload];
            return {
                ...state,
                customerArr: arr
            }
        }
        case actionTypes.CUSTOMER_DELETED:
            let arr = state.customerArr.filter(p => p._id !== action.payload)
            return {
                ...state,
                customerArr: arr

            }
        case actionTypes.CUSTOMER_UPDATED:
            return {
                ...state,
                updateCustomer: action.payload
            }
        case actionTypes.CUSTOMER_SELECTED:
            return {
                ...state,
                selectedCustumer: action.payload
            }
        case actionTypes.CUSTOMER_SAVED:
            return {
                ...state,
                customerArr: [...action.payload]
            }
    }
    return state;
}