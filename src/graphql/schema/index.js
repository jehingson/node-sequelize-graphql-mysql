import { gql } from 'apollo-server-express'
import postsSchema from '../resolvers/posts'
import usersSchema from './users'

const baseSchema = gql`
scalar Date

type Query {
    _:Boolean
}
type Mutation {
    _:Boolean
}
type Subscription {
    _:Boolean
}

`



export default [baseSchema, usersSchema, postsSchema]