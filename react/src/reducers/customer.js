import * as actionTypes from "../actions/actionTypes";
const initialState = {
    customerArr: [],
    selectedCustumer: null,
    updateCustomer: null,
    AdminEmail:"sarafremd@gmail.com",
    userAuth:localStorage.getItem('Auth'),
    currentUser:null,
    room:'main'
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
        case actionTypes.UPDATE_CURRENT_USER:
                debugger
                    return {
                        ...state,
                        currentUser: action.payload,
                    }
        case actionTypes.UPDATE_AUTH:
            debugger
                return {
                    ...state,
                    userAuth: action.payload,
                }
        case actionTypes.UPDATE_CHAT:
                    debugger
                        return {
                            ...state,
                            room: action.payload
                        }
    }
    return state;
}