import * as actionTypes from './actionTypes';
import axios from "axios";

export const addCompetition = (competition) => {
    return {
        type: actionTypes.COMPETITION_ADDED,
        payload: competition
    }
}
export const deleteCompetition = (_id) => {
    return {
        type: actionTypes.COMPETITION_DELETED,
        payload: _id
    }
}
export const updateCompetition = (competition) => {
    return {
        type: actionTypes.COMPETITION_UPDATED,
        payload: competition
    }
}
export const selecteCompetition = (competition) => {
    return {
        type: actionTypes.COMPETITION_SELECTED,
        payload: competition
    }
}