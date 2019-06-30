import { CHANGE_USER_NAME } from '../actions/actionTypes';
const initialState = {
    userName: ''
}
export const userNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER_NAME:
            return {
                ...state,
                userName: action.userName
            };
        default:
            return state;
    }
};