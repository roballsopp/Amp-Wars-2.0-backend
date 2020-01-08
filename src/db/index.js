import { Sequelize } from 'sequelize';

// TODO: set log verbosity with env
export const connect = () => {
	return new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
		host: process.env.PGHOST,
		port: process.env.PGPORT,
		dialect: 'postgres',
		dialectOptions: {
			ssl: process.env.PGSSL === 'true',
		},
	});
};
