import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

export default new GraphQLScalarType({
	name: 'JSON',
	serialize: value => value,
	parseValue: value => value,
	parseLiteral: ast => {
		if (ast.kind !== Kind.OBJECT) {
			throw new GraphQLError(`Query error: Can only parse object but got a: ${ast.kind}`, [ast]);
		}
		return ast.value;
	},
});
