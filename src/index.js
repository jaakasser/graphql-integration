const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { ApolloServer } = require('apollo-server');
const { mergeResolvers, mergeTypeDefs } = require('@graphql-tools/merge');
const { print } = require('graphql');

// Read all type definitions
const apiFilenames = glob.sync(path.join(__dirname, 'api', '**/*.graphql'));
const typeDefs = mergeTypeDefs(apiFilenames.map((filename) => fs.readFileSync(filename, 'utf8')));

// Write merged schema to file
fs.writeFileSync(path.join(__dirname, 'generated', 'schema.graphql'), print(typeDefs), 'utf8');

// Read all resolvers
const resolverFilenames = glob.sync(path.join(__dirname, 'api', '**/*+(-resolver).js'));
const resolvers = mergeResolvers(resolverFilenames.map((filename) => require(filename)));

// The ApolloServer constructor requires two parameters: your schema definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, uploads: false });

// Start server
server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
	console.log(`GraphQL playground available at ${url}graphql`);
});
