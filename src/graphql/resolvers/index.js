import { GraphQLDateTime } from 'graphql-iso-date'

const customScalarResolver = {
    Date: GraphQLDateTime,
}

import userResolver from './users'
import postResolver from './posts'




export default [customScalarResolver, userResolver, postResolver]