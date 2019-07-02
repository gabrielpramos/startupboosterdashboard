//types
import { CHANGE_USER_NAME, CHANGE_REPOSITORY_NAME, MERGE_QUERY_CHANGE } from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialUserState = {
    value: '',
}
const initialRepositoryState = {
    value: '',
}
const initialMergeQueryState = {
    data: {
        lastCursor: null,
        totalCount: 0,
        nodes: []
    }
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

export const mergeQueryReducer = (state = initialMergeQueryState, action) => {
    switch (action.type) {
        case MERGE_QUERY_CHANGE:
            return {
                ...state,
                value: action.value
            };
        default:
            return state;
    }
}

export const Reducers = combineReducers({
    userNameState: userNameReducer,
    repositoryNameState: repositoryNameReducer,
    mergeQueryState: mergeQueryReducer,
});