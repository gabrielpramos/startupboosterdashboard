import { CHANGE_REPOSITORY_NAME } from '../actions/actionTypes';
const initialState = {
    repositoryName: ''
}
export const repositoryNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_REPOSITORY_NAME:
            return {
                ...state,
                repositoryName: action.repositoryName
            };
        default:
            return state;
    }
};