import express from 'express';
import authenticationMiddleware from './authentication.middleware';
import authenticationRoutes from './authentication.routes';
import corsMiddleware from './cors.middleware';
import errorHandlerMiddleware from './error-handler.middleware';
import graphqlMiddleware from './graphql.middleware';
import loggingMiddleware from './logging.middleware';
import buildModels from '../model-factory.js';
import { connect as connectToPg } from '../db';

const app = express();

corsMiddleware(app);
loggingMiddleware(app, {
	skip: req => req.url === '/health',
});

app.use(express.json());

app.get('/health', (req, res) => res.status(200).json({ status: 'Ok' }));

const sequelize = connectToPg();
const models = buildModels(sequelize);

authenticationRoutes(app, models);
authenticationMiddleware(app);
const graphQlApp = express.Router();
graphqlMiddleware(graphQlApp, models, sequelize);
app.use('/graphql', graphQlApp);

errorHandlerMiddleware(app);

const port = process.env.SERVER_PORT;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`GQL server ready on port ${port}`));
