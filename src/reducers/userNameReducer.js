import { CHANGE_USER_NAME } from '../actions/actionTypes';
const initialState = {
    newValue: ''
}
export const userNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER_NAME:
            return {
                ...state,
                newValue: action.newValue
            };
        default:
            return state;
    }
};