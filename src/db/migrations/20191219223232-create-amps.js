module.exports = {
	up: queryInterface => {
		return queryInterface.sequelize.query(`
			CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
		
			CREATE TABLE IF NOT EXISTS amps
			(
					id uuid NOT NULL DEFAULT uuid_generate_v4(),
					src character varying(255) NOT NULL,
					title character varying(255) NOT NULL,
					description character varying(255),
					created_at timestamp with time zone NOT NULL DEFAULT now(),
					updated_at timestamp with time zone NOT NULL DEFAULT now(),
					CONSTRAINT amps_pkey PRIMARY KEY (id)
			);
    `);
	},
	down: () => {},
};
