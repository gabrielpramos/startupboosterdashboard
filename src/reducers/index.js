import { CHANGE_USER_NAME, CHANGE_REPOSITORY_NAME, MERGE_DATA_INSIGHTS, PULL_REQUEST_DATA_INSIGHTS } from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialUserState = {
    value: '',
}
const initialRepositoryState = {
    value: '',
}
const initialMergeDataInsightsState = {
    large: { average: 0, pullRequests: 0 },
    medium: { average: 0, pullRequests: 0 },
    small: { average: 0, pullRequests: 0 },
}

const initialPullReQuestTimeState = {
    insights: {
        average: 0
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

export const mergeDataInsightsReducer = (state = initialMergeDataInsightsState, action) => {
    switch (action.type) {
        case MERGE_DATA_INSIGHTS:
            return {
                ...state,
                value: action.value
            };
        default:
            return state;
    }
}

export const pullRequestDataInsightsReducer = (state = initialPullReQuestTimeState, action) => {
    switch (action.type) {
        case PULL_REQUEST_DATA_INSIGHTS:
            return {
                ...state,
                value: action
            };
        default:
            return state;
    }
}

export const Reducers = combineReducers({
    userNameState: userNameReducer,
    repositoryNameState: repositoryNameReducer,
    mergeDataInsightsState: mergeDataInsightsReducer,
    pullRequestDataInsightsState: pullRequestDataInsightsReducer
});