import { CLICK_UPDATE_VALUE, CHANGE_USER_NAME, CHANGE_REPOSITORY_NAME } from '../actions/actionTypes';
export const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  newValue: value
});

export const userNameChange = value => ({
  type: CHANGE_USER_NAME,
  userName: value
});

export const repositoryNameChange = value => ({
  type: CHANGE_REPOSITORY_NAME,
  repositoryName: value
});