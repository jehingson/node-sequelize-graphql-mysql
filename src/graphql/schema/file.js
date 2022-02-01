import { gql } from 'apollo-server-express';

module.exports = gql`
  type File {
    url: String!
  }
  extend type Query {
    hello: String!
  }
  extend type Mutation {
    uploadFile(file: Upload!):File!
  }
  `