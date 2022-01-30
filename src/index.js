import { sequelize } from './models/index'

require('dotenv').config()

import cors from 'cors'
import http from 'http'
import jwt from 'jsonwebtoken' 
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import DB from './models/index.js'

const app = express()
app.use(cors())

const server = new ApolloServer({ 
  instrospection: true,
  typeDefs, 
  resolvers,
  context: async ({req, connection}) => {
    authUser: req.user
  }
});
server.applyMiddleware({ app, path: '/graphql' })
const httpServer = http.createServer(app)


DB.sequelize.sync({
  force: process.env.SSLON === 'false' ? false : true
})


const PORT = process.env.PORT || 4500;

httpServer.listen({ port: PORT }, () => {
  console.log(`Server ready at ${process.env.URL}:${process.env.PORT}${server.graphqlPath}`)
});
