import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../node.graphql';

export const UserGraphQLType = new GraphQLObjectType({
	name: 'User',
	description: 'Represents a user of the application.',
	interfaces: [nodeInterface],
	isTypeOf: (obj, ctx) => {
		return obj instanceof ctx.sequelize.model('user');
	},
	fields: () => ({
		id: globalIdField(),
		email: { type: new GraphQLNonNull(GraphQLString) },
		firstName: { type: new GraphQLNonNull(GraphQLString) },
		lastName: { type: new GraphQLNonNull(GraphQLString) },
		createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
		updatedAt: { type: new GraphQLNonNull(GraphQLDateTime) },
	}),
});
