import * as actionTypes from "../actions/actionTypes";
const initialState = {
    productArr: [],
    selectedProduct: null,
    updateProduct: null,
    selectedProducts:[]
}
export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_ADDED:
            return {
                ...state,
                productArr: [...state.productArr, action.payload]
            }
            case actionTypes.PRODUCT_DELETED:
                let arr = state.productArr.filter(p => p._id !== action.payload)
                return {
                    ...state,
                    productArr: arr
    
                } 
                case actionTypes.SELECTED_PRODUCT_DELETED:
                    debugger;
                    // let currentArr = state.selectedProducts.filter(p => p._id !== action.payload)
                    return {
                        ...state,
                        selectedProducts: action.newArr
        
                    } 
        case actionTypes.PRODUCT_UPDATED:
            return {
                ...state,
                updateProduct: action.payload
            }
        case actionTypes.PRODUCT_SELECTED:
            return {
                ...state,
                selectedProduct: action.payload
            }
        case actionTypes.PRODUCTS_SAVED:
            console.log("Saved");
            return {
                ...state,
                productArr: [...action.payload]
            }
    }
    return state;
}