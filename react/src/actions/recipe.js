import * as actionTypes from './actionTypes';
import axios from "axios";

export const addRecipe = (recipe) => {
    return {
        type: actionTypes.RECIPE_ADDED,
        payload: recipe
    }
}
export const deleteRecipe = (_id) => {
    return {
        type: actionTypes.RECIPE_DELETED,
        payload: _id
    }
}
export const selecteRecipe = (recipe) => {
    return {
        type: actionTypes.RECIPE_SELECTED,
        payload: recipe
    }
}
export const updateRecipe = (recipe) => {
    return {
        type: actionTypes.RECIPE_SELECTED,
        payload: recipe
    }
}