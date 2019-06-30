import { clickReducer } from './clickReducer';
import { userNameReducer } from './userNameReducer';
import { repositoryNameReducer } from './repositoryNameReducer'

import { combineReducers } from 'redux';
export const Reducers = combineReducers({
    clickState: clickReducer,
    userNameState: userNameReducer,
    repositoryNameState: repositoryNameReducer,
});