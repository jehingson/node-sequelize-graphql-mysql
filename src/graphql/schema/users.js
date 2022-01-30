import { gql } from 'apollo-server-express'

export default gql`

    type Token {
        token: String!
    }

    type User{
        id: ID!
        username: String!
        email: String!
        password: String!
        photo: String!
        createdAt: String!
        posts: [Posts!]
    }

    extend type Query{
        users: [User!]
        user(id: ID!): User
        me: User
    }

    extend type Mutation {
        signIn(email: String, password: String): User!
        signUp(username: String!, email: String, password: String): User!
        updateUser(username: String!, photo: String): User!
    }

    extend type Subscription {
    }

`