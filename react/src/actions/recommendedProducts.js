import * as actionTypes from './actionTypes';
import axios from "axios";
export const addRecommendedProduct = (product) => {
    return {
        type: actionTypes.RECOMMENDED_PRODUCT_ADDED,
        payload: product
    }
}
export const deleteRecommendedProduct = (_id) => {
    return {
        type: actionTypes.RECOMMENDED_PRODUCT_DELETED,
        payload: _id
    }
}
export const selecteRecommendedProduct = (product) => {
    return {
        type: actionTypes.RECOMMENDED_PRODUCT_SELECTED,
        payload: product
    }
}
export const updateRecommendedProduct = (product) => {
    return {
        type: actionTypes.RECOMMENDED_PRODUCT_UPDATED,
        payload: product
    }
}