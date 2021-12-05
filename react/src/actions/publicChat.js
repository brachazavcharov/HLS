import * as actionTypes from './actionTypes';
import axios from "axios";

export const addMessage = (message) => {
    return {
        type: actionTypes.MESSAGE_ADDED,
        payload: message
    }
}
