const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { typeDefs } = require('./src/schema/typeDefs'); // <--- Importa el objeto typeDefs
const { resolvers } = require('./src/resolvers/index'); // <--- Importa el objeto resolvers

const app = express();

async function startServer() {


  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers, // <--- Usa el objeto resolvers
    introspection: true
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

startServer().catch(error => {
  console.error('Error al iniciar el servidor:', error);
});