import { CHANGE_REPOSITORY_NAME } from '../actions/actionTypes';
const initialState = {
    newValue: ''
}
export const repositoryNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_REPOSITORY_NAME:
            return {
                ...state,
                newValue: action.newValue
            };
        default:
            return state;
    }
};