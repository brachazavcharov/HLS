import * as actionTypes from './actionTypes';
import axios from "axios";

export const addOrder = (order) => {
    return {
        type: actionTypes.ORDER_ADDED,
        payload: order
    }
}
export const selecteOrder = (order) => {
    return {
        type: actionTypes.ORDER_SELECTED,
        payload: order
    }
}
export const deleteOrder = (_id) => {
    return {
        type: actionTypes.ORDER_DELETED,
        payload: _id
    }
}
export const updateOrder = (order) => {
    return {
        type: actionTypes.ORDER_UPDATED,
        payload: order
    }
}
export const saveOrder = (orders) => {
    return {
        type: actionTypes.ORDER_SAVED,
        payload: orders
    }
}
export const getAllOrders = () => {
    return (dispatch) => {
        debugger
        axios.get('http://localhost:5000/order')
        .then(response=> {
          console.log(JSON.stringify(response.data));
          dispatch(saveOrder(response.data))
        })
        .catch(function (error) {
          console.log(error);
        });
    }
}