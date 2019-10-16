const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');


const PORT = 3000;

const app = express();

const Query = gql`
  type Query {
    status: String
  }
`;

const typeDefs = [Query];

const resolvers = {
  Query: {
    status: () => "GrpahQL status: OK"
  }
};

// const server = new ApolloServer({ typeDefs, resolvers });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'light'
    }
  }
});

server.applyMiddleware({ app });

app.get('/status', (req, res) => res.send('Express status: OK'))

console.log(`Express running on ${PORT}`)
app.listen(PORT)
