import request from './request';
import queries from './queries';

export default {
  getMergeByPullRequestSize(userName, repositoryName, cursor = null) {
    let query = {
      query: queries.mergeByPullRequestSizeQuery,
      variables: { "username": userName, "repositoryname": repositoryName, "after": cursor }
    }
    return request().post('', query);
  },

  getMergeData(userName, repositoryName, cursor = null) {
    let query = {
      query: queries.mergeByPullRequestSizeQuery,
      variables: { "username": userName, "repositoryname": repositoryName, "after": cursor }
    }
    return request().post('', query);
  }
};