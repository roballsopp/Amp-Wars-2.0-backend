import express from 'express';
import buildModels from './model-factory.js';
import { connect as connectToPg } from './db';
import { corsMiddleware, graphqlMiddleware, loggingMiddleware, errorHandlerMiddleware } from './express';

const app = express();

corsMiddleware(app);
loggingMiddleware(app, {
	skip: req => req.url === '/health',
});

app.get('/health', (req, res) => res.status(200).json({ status: 'Ok' }));

// authenticationMiddleware(app);

const sequelize = connectToPg();
const models = buildModels(sequelize);

const graphQlApp = express.Router();
graphqlMiddleware(graphQlApp, models, sequelize);
app.use('/graphql', graphQlApp);

errorHandlerMiddleware(app);

const port = process.env.SERVER_PORT;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`GQL server ready on port ${port}`));
