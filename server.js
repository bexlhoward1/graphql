var express = require("express");
var graphqlHTTP = require("express-graphql");
var {
  buildSchema
} = require("graphql");

var schema = buildSchema(`
  type User {
    id: ID
    name: String
  }

  type Query {
    user(id: ID): User
  }
`);

// Maps id to User object
var fakeDatabase = {
  1: {
    name: 'Bex',
  },
  2: {
    name: 'Riley',
  },
};

var root = {
  user: function ({
    id
  }) {
    return fakeDatabase[id];
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');