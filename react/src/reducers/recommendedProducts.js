import * as actionTypes from "../actions/actionTypes";
const initialState = {
    recommendedProductsArr: [],
    selectedRecommendedProducts: null,
    updateRecommendedProducts: null
}
export const recommendedProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RECOMMENDED_PRODUCT_ADDED:
            return {
                ...state,
                recommendedProductsArr: [...state.recommendedProductsArr, action.payload]
            }
        case actionTypes.RECOMMENDED_PRODUCT_DELETED:
            let arr = state.recommendedProductsArr.filter(p => p._id !== action.payload)
            return {
                ...state,
                recommendedProductsArr:arr

            }
        case actionTypes.RECOMMENDED_PRODUCT_UPDATED:
            return {
                ...state,
                updateRecommendedProducts: action.payload
            }
        case actionTypes.RECOMMENDED_PRODUCT_SELECTED:
            return {
                ...state,
                selectedRecommendedProducts: action.payload
            }
    }
    return state;
}