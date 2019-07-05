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
      query: queries.mergeQuery,
      variables: { "username": userName, "repositoryname": repositoryName, "after": cursor }
    }
    return request().post('', query);
  },

  getIssueData(userName, repositoryName, cursor = null) {
    let query = {
      query: queries.issueQuery,
      variables: { "username": userName, "repositoryname": repositoryName, "after": cursor }
    }
    return request().post('', query);
  },

  getMonthSummaryData(userName, repositoryName, pullRequestsCursor = null, issueRequestsCursor = null) {
    let query = {
      query: queries.monthSummaryQuery,
      variables: { "username": userName, "repositoryname": repositoryName, "pullRequestsCursor": pullRequestsCursor, "issueRequestsCursor": issueRequestsCursor }
    }
    return request().post('', query);
  }
};