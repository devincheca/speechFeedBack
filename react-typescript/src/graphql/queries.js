/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTiVotes = /* GraphQL */ `
  query GetTiVotes($Id: String!) {
    getTiVotes(Id: $Id) {
      Id
      VoteId
      Vote
      __typename
    }
  }
`;
export const listTiVotes = /* GraphQL */ `
  query ListTiVotes(
    $filter: TableTiVotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTiVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Id
        VoteId
        Vote
        __typename
      }
      nextToken
      __typename
    }
  }
`;
