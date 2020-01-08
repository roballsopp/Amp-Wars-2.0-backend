import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../node.graphql';

export const AmpGraphQLType = new GraphQLObjectType({
	name: 'Amp',
	description: 'Represents a particular amp submission.',
	interfaces: [nodeInterface],
	isTypeOf: (obj, ctx) => {
		return obj instanceof ctx.sequelize.model('amp');
	},
	fields: () => ({
		id: globalIdField(),
		src: { type: new GraphQLNonNull(GraphQLString) },
		title: { type: new GraphQLNonNull(GraphQLString) },
		description: { type: GraphQLString },
		createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
		updatedAt: { type: new GraphQLNonNull(GraphQLDateTime) },
	}),
});
