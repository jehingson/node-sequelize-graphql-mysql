const { gql } = require('apollo-server-express');

module.exports =  gql`
scalar DateTime
  type User {
   uid: Int!
   username: String!
   email: String!
   photo: String!
   posts: [Post]
   token: String!
   password: String!
   createdAt: DateTime! # will be generated
   updatedAt: DateTime! # will be generated
  }
  
  extend type Query {
    allUsers: [User]
    fetchUser(id: Int!): User
  }
  extend type Mutation {
    signIn (
        email: String!,
        password: String!
    ): User!
    register(
        username: String!,
        email: String,
        password: String!,
    ): User!
    updateUser (
        username: String!,
        photo: String,
    ): User!
  }`