// TODO: this is dumb. figure out how to just provide one config from env vars
module.exports = {
	development: {
		username: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		host: process.env.PGHOST,
		port: process.env.PGPORT,
		dialect: 'postgres',
		dialectOptions: {
			ssl: process.env.PGSSL === 'true',
		},
	},
	test: {
		username: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		host: process.env.PGHOST,
		port: process.env.PGPORT,
		dialect: 'postgres',
		dialectOptions: {
			ssl: process.env.PGSSL === 'true',
		},
	},
	production: {
		username: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		host: process.env.PGHOST,
		port: process.env.PGPORT,
		dialect: 'postgres',
		dialectOptions: {
			ssl: process.env.PGSSL === 'true',
		},
	},
};
