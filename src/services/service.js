import request from './request';

const MAX_ROWS_ALLOWED = 100;

export default {
  getMergeData(userName, repositoryName, cursor = null) {
    let query = {
      query: `
    query($username : String!, $repositoryname: String!, $after: String) {
      user(login: $username){
        repositories: repository(name: $repositoryname){
          pullRequests (first:${MAX_ROWS_ALLOWED} states: MERGED after:$after){
            totalCount
            pageInfo{
              endCursor
            }
            edges{
              node{
                additions
                deletions
                createdAt
                mergedAt
              }
            }
          }
        }
      }
      organization(login: $username){
        repositories: repository(name: $repositoryname){
          pullRequests (first:${MAX_ROWS_ALLOWED} states: MERGED after:$after){
            totalCount
            pageInfo{
              endCursor
            }
            edges{
              node{
                additions
                deletions
                createdAt
                mergedAt
              }
            }
          }
        }
      }
    }`,
      variables: { "username": userName, "repositoryname": repositoryName, "after": cursor }
    }
    return request().post('', query);
  }
};