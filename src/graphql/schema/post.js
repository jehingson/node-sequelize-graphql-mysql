const { gql } = require('apollo-server-express');

module.exports = gql`
  type Post {
    id: Int!
    title: String!
    description: String!
    status: Boolean!
    user: User!
    createdAt: DateTime! # will be generated
    updatedAt: DateTime! # will be generated
  }
  
  extend type Query {
    allPost: [Post]
    fetchPost(id: Int!): Post
  }
  extend type Mutation {
    addPost (
        title: String!,
        description: String!,
        status: Boolean
    ): Post
    updatePost (
        id: Int!,
        title: String!,
        description: String
        status: Boolean,
    ): Post
    deletePost (
        id: Int!
    ): Boolean
  }
`