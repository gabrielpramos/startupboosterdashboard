//types
import { CHANGE_USER_NAME, CHANGE_REPOSITORY_NAME } from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialUserState = {
    userName: '',
}
const initialRepositoryState = {
    repositoryName: '',
}

export const userNameReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case CHANGE_USER_NAME:
            return {
                ...state,
                value: action.value
            };
        default:
            return state;
    }
};

export const repositoryNameReducer = (state = initialRepositoryState, action) => {
    switch (action.type) {
        case CHANGE_REPOSITORY_NAME:
            return {
                ...state,
                value: action.value
            };
        default:
            return state;
    }
};

export const Reducers = combineReducers({
    userNameState: userNameReducer,
    repositoryNameState: repositoryNameReducer,
});