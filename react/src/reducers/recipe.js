import * as actionTypes from "../actions/actionTypes";
const initialState = {
    recipeArr: [],
    selectedRecipe: null,
    updateRecipe: null
}
export const recipeRecipe = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RECIPE_ADDED:
            return {
                ...state,
                recipeArr: [...state.recipeArr, action.payload]
            }
        case actionTypes.RECIPE_DELETED:
            let arr = state.recipeArr.filter(p => p._id !== action.payload)
            return {
                ...state,
                recipeArr:arr

            }
        case actionTypes.RECIPE_UPDATED:
            return {
                ...state,
                updateRecipe: action.payload
            }
        case actionTypes.RECIPE_SELECTED:
            return {
                ...state,
                selectedRecipe: action.payload
            }
    }
    return state;
}