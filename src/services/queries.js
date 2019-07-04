
const MAX_ROWS_ALLOWED = 100;

const patternQueryBody = (data) => {
    return `query($username : String!, $repositoryname: String!, $after: String) {
                user(login: $username){
                repositories: repository(name: $repositoryname){
                    pullRequests (first:${MAX_ROWS_ALLOWED} states: MERGED after:$after){
                    ${data}
                    }
                }    
                organization(login: $username){
                repositories: repository(name: $repositoryname){
                    pullRequests (first:${MAX_ROWS_ALLOWED} states: MERGED after:$after){
                    ${data}
                }
                }
            }
        }
    }`;
}

export default {
    mergeByPullRequestSizeQuery: patternQueryBody(`
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
    `),
    mergeQuery: patternQueryBody(`
    totalCount
          pageInfo{
            endCursor
          }
          edges{
            node{
              createdAt
              mergedAt
            }
        }
    `),
}