import * as actionTypes from "../actions/actionTypes";
const initialState = {
    personalChatArr: []
}
export const personalChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MESSAGE_ADDED:
            return {
                ...state,
                personalChatArr: [...state.personalChatArr, action.payload]
            }

    }
    return state;
}