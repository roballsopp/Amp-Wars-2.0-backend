import graphqlHTTP from 'express-graphql';
import graphqlSchema from '../schema.graphql';
import { formatError } from '../errors';

export default (app, models, sequelize) => {
	app.use(
		graphqlHTTP((req, res) => {
			// get things from res.locals here
			return {
				schema: graphqlSchema,
				graphiql: process.env.NODE_ENV === 'development',
				context: {
					models,
					sequelize,
				},
				customFormatErrorFn: err => {
					console.error('GraphQL error:', err);
					return formatError(err);
				},
			};
		})
	);
};
