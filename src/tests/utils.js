const { ApolloServer } = require('apollo-server');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { mergeResolvers, mergeTypeDefs } = require('@graphql-tools/merge');

const createTestServer = () => {
	// Read all type definitions
	const apiFilenames = glob.sync(path.join(__dirname, '..', 'api', '**/*.graphql'));
	const typeDefs = mergeTypeDefs(apiFilenames.map((filename) => fs.readFileSync(filename, 'utf8')));

	// Read all resolvers
	const resolverFilenames = glob.sync(path.join(__dirname, '..', 'api', '**/*+(-resolver).js'));
	const resolvers = mergeResolvers(resolverFilenames.map((filename) => require(filename)));

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => {},
		uploads: false,
	});

	return { server };
};

module.exports = {
	createTestServer,
};
