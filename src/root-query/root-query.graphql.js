import { GraphQLObjectType } from 'graphql';
import { nodeField, nodesField } from '../node.graphql';
import AmpConnection from './amp-connection.graphql';

export default new GraphQLObjectType({
	name: 'RootQuery',
	fields: () => ({
		node: nodeField,
		nodes: nodesField,
		ampSubmissions: AmpConnection,
	}),
});
