require('dotenv/config');
import cors  from 'cors'
import http  from 'http'
import jwt  from 'jsonwebtoken'
import express  from 'express'
import {
  ApolloServer,
  AuthenticationError
}  from 'apollo-server-express'
import DB  from './models/index.js'
import schema  from './graphql/schema'
import resolvers  from './graphql/resolvers'

const app = express();

app.use(cors());
DB.sequelize.sync({
  force: process.env.SSLON === 'true' ? true : false
});

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: async ({req}) => {
    console.log(authUser);
    const authUser = await getUser(req);
    return {
      authUser
    }
  }
});

const getUser = async (req) => {
   const token = req.headers['x-token'];
   if(token){
     try {
       return await jwt.verify(token, process.env.JWT_SECRET) 
     }catch(e){
        throw new AuthenticationError('El usuario no esta autenticado');
     }
   }
}




server.applyMiddleware({ app, path: '/graphql' });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 3000;

httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
});