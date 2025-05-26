const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { gql } = require('graphql-tag');

// Definición de esquema GraphQL de ejemplo
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Resolvers de ejemplo
const resolvers = {
  Query: {
    hello: () => '¡Hola, GraphQL!',
  },
};

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();