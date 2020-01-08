import { GraphQLEnumType, GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { BadRequestError } from '../errors';

const OrderByDirectionType = new GraphQLEnumType({
	name: 'OrderByDirection',
	values: {
		asc: { value: 'asc' },
		desc: { value: 'desc' },
	},
});

export const buildOrderByType = (prefix, valueConfig) =>
	new GraphQLList(
		new GraphQLNonNull(
			new GraphQLInputObjectType({
				name: `${prefix}OrderByConfig`,
				fields: {
					fieldName: {
						type: new GraphQLNonNull(
							new GraphQLEnumType({
								name: `${prefix}OrderByField`,
								values: valueConfig,
							})
						),
					},
					direction: {
						type: new GraphQLNonNull(OrderByDirectionType),
						defaultValue: 'asc',
					},
				},
			})
		)
	);

export const getOrderOptsFromArg = arg => {
	if (!arg) return [];
	if (!Array.isArray(arg)) throw new BadRequestError('order argument must be an array');
	return arg.map(({ fieldName, direction }) => [fieldName, direction]);
};
