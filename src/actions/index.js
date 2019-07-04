import { CHANGE_USER_NAME, CHANGE_REPOSITORY_NAME, MERGE_DATA_INSIGHTS, PULL_REQUEST_DATA_INSIGHTS } from '../actions/actionTypes';

export const userNameChange = value => ({
  type: CHANGE_USER_NAME,
  value: value
});

export const repositoryNameChange = value => ({
  type: CHANGE_REPOSITORY_NAME,
  value: value
});

export const mergeDataInsightsChange = value => ({
  type: MERGE_DATA_INSIGHTS,
  value: value
});

export const pullRequestDataInsightsChange = value => ({
  type: PULL_REQUEST_DATA_INSIGHTS,
  value: value
});
