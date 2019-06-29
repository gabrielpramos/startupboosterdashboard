import { CLICK_UPDATE_VALUE, CHANGE_USER_NAME, CHANGE_REPOSITORY_NAME } from '../actions/actionTypes';
export const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  newValue: value
});

export const userName = value => ({
  type: CHANGE_USER_NAME,
  newValue: value
});

export const repositoryName = value => ({
  type: CHANGE_REPOSITORY_NAME,
  newValue: value
});