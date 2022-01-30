import { gql } from 'apollo-server-express'

export default gql`

    type Post{
        id: Int!
        title: String!
        description: String!
        image: String!
        createdAt: Date;
        user: User!
    }

    type PostCreated {
        post: Post!
    }

    extend type Query{
        post(id: ID!): Post!
    }

    extend type Mutation {
        createPost(title: String, description: String, image: String)
        deletePost(id: ID!): Boolean;
    }
    
    extend type Subscription {
        postCreated: PostCreated!
    }

`