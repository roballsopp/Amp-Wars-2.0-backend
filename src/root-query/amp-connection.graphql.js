import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { connectionArgs, connectionDefinitions, connectionFromArraySlice } from 'graphql-relay';
import { getPaginationOptsFromConnectionArgs } from '../relay';
import { AmpGraphQLType } from '../amp';
import { buildOrderByType, getOrderOptsFromArg } from '../graphql-common';

export default {
	type: new GraphQLNonNull(
		connectionDefinitions({
			name: 'Amp',
			nodeType: new GraphQLNonNull(AmpGraphQLType),
			connectionFields: {
				count: {
					type: new GraphQLNonNull(GraphQLInt),
					resolve: conn => conn.count,
				},
			},
		}).connectionType
	),
	args: {
		...connectionArgs,
		offset: {
			type: GraphQLInt,
			description: 'Alternative to relay cursor pagination. This is the row offset to start at.',
		},
		order: {
			type: buildOrderByType('Amps', {
				title: { value: 'title' },
				createdAt: { value: 'createdAt' },
				updatedAt: { value: 'updatedAt' },
			}),
			defaultValue: [{ fieldName: 'title', direction: 'asc' }],
		},
	},
	resolve: async (_, args, { models, user }) => {
		const { offset, order } = args;
		const paginationOpts = getPaginationOptsFromConnectionArgs(args);
		const orderOpts = getOrderOptsFromArg(order);
		if (Number.isFinite(offset)) paginationOpts.offset = offset;
		const [submissions, count] = await models.amp.find(user, paginationOpts, orderOpts);
		const connection = connectionFromArraySlice(submissions, args, {
			sliceStart: paginationOpts.offset,
			arrayLength: count,
		});
		connection.count = count;
		return connection;
	},
};
