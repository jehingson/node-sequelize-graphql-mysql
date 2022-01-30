import { gql } from "apollo-server"

module.exports = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        photo: String!
        token: String!
        createdAt: String!
    },
    type Post {
        id: Int!
        title: String!
        description: String!
        image: String!
        user: User!
    },

    type Query  {
        login(email:String, password:String): User!
        getUsers: [User!]!
        oneUser(id: Int!): User!
        getPosts: [Post!]!
        onePost(id: Int!): Post!

    },
    type Mutation {
        register(username: String!, email: String!, password: String!): User!
        createPost(userId: Int!, title: String!, description: String, image: String!): Post!
    }
`
