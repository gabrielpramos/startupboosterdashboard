
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

const monthSummaryQuery = () => {
    return `
    query($username : String!, $repositoryname: String!, $pullRequestsCursor: String, $issueRequestsCursor: String) {
        user(login: $username){
          repositories: repository(name: $repositoryname){
            pullRequests (first:${MAX_ROWS_ALLOWED} after:$pullRequestsCursor){
              totalCount
              pageInfo{
                endCursor
              }
              edges{
                node{
                  createdAt
                  mergedAt
                  closedAt
                }
              }
            }
            issues (first:${MAX_ROWS_ALLOWED} after:$issueRequestsCursor){
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
          }  
        }
            organization(login: $username){
              repositories: repository(name: $repositoryname){
                    name
                pullRequests (first:${MAX_ROWS_ALLOWED} after:$pullRequestsCursor){
      
                totalCount
                pageInfo{
                    endCursor
                }
                edges{
                  node{
                    createdAt
                    mergedAt
                    closedAt
                  }
                }
      
              }
              issues (first:${MAX_ROWS_ALLOWED} after:$issueRequestsCursor){
      
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

    monthSummaryQuery: monthSummaryQuery(),
}