const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const path = require('path');

//Graph QL Related Imports are handled here
const {ApolloServer, PubSub} = require('apollo-server-express');
const {fileLoader, mergeTypes, mergeResolvers} = require('merge-graphql-schemas');
//////////////////////////////////////////////////

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./server/app');

// PubSub Instance Creation
const pubsub = new PubSub()
///////////////////////////////////////////////////

//GraphQl Type and Resolver imports
const typeDefs = mergeTypes(fileLoader(
  path.join(__dirname, '/server/graphQl/typeDefs')
))
const resolvers = mergeResolvers(fileLoader(
  path.join(__dirname, 'server/graphQl/resolvers')
))
///////////////////////////////////////////////////

// Apollo Server Instance 
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req, connection}) => ({req, pubsub,connection})
});
////////////////////////////////////////////////////

// Apollo Server Middleware
apolloServer.applyMiddleware({app})
//Connects Apollo Server to a specific HTTP framework i.e. Express 
///////////////////////////////////////////////////

// Enables Subscription for Realtime Data Exchange
const httpserver = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpserver);
////////////////////////////////////////////////////

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000;
const server = httpserver.listen(port, () => {
  console.log(`App running on port ${port}...`);
  console.log(`graphql server is ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    console.log(`subscription is ready at http://localhost:${port}${apolloServer.subscriptionsPath}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
