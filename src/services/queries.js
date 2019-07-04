
const MAX_ROWS_ALLOWED = 100;

const patternQueryBody = (data) => {
    return `query($username : String!, $repositoryname: String!, $after: String) {
                user(login: $username){
                repositories: repository(name: $repositoryname){                    
                    ${data}                    
                }
            }
                organization(login: $username){
                repositories: repository(name: $repositoryname){                   
                    ${data}               
                }
            }
    }`;
}

export default {
    mergeByPullRequestSizeQuery: patternQueryBody(`
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
    `),
    mergeQuery: patternQueryBody(`
    pullRequests (first:${MAX_ROWS_ALLOWED} states: MERGED after:$after){
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
    }
    `),
    issueQuery: patternQueryBody(`
    issues (first:${MAX_ROWS_ALLOWED} after:$after){
        totalCount
          pageInfo{
            endCursor
          }
          edges{
            node{
              createdAt
              closedAt
            }
        }
    }
    `),
}