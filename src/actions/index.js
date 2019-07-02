import { CHANGE_USER_NAME, CHANGE_REPOSITORY_NAME, MERGE_QUERY_CHANGE } from '../actions/actionTypes';

export const userNameChange = value => ({
  type: CHANGE_USER_NAME,
  value: value
});

export const repositoryNameChange = value => ({
  type: CHANGE_REPOSITORY_NAME,
  value: value
});

export const mergeQueryChange = value => ({
  type: MERGE_QUERY_CHANGE,
  value: value
});