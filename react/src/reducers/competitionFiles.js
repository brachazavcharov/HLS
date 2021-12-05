import * as actionTypes from "../actions/actionTypes";
const initialState = {
    competitionFilesArr: [],
    selectedCompetitionFiles: null,
    updateCompetitionFiles: null
}
export const competitionFilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMPETITION_ADDED:
            return {
                ...state,
                competitionFilesArr: [...state.competitionFilesArr, action.payload]
            }
        case actionTypes.COMPETITION_DELETED:
            let arr = state.competitionFilesArr.filter(p => p._id !== action.payload)
            return {
                ...state,
                competitionFilesArr:arr
            }
        case actionTypes.COMPETITION_UPDATED:
            return {
                ...state,
                updateCompetitionFiles: action.payload
            }
        case actionTypes.COMPETITION_SELECTED:
            return {
                ...state,
                selectedCompetitionFiles: action.payload
            }
    }
    return state;
}