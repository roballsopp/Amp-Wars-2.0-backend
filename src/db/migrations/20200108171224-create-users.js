module.exports = {
	up: queryInterface => {
		return queryInterface.sequelize.query(`
			CREATE EXTENSION IF NOT EXISTS citext;
			CREATE TABLE IF NOT EXISTS users
			(
				id uuid NOT NULL DEFAULT uuid_generate_v4(),
				email citext NOT NULL UNIQUE,
				password text NOT NULL,
				first_name text NOT NULL,
				last_name text NOT NULL,
				created_at timestamp with time zone NOT NULL DEFAULT now(),
				updated_at timestamp with time zone NOT NULL DEFAULT now(),
				CONSTRAINT users_pkey PRIMARY KEY (id)
			);
		`);
	},
	down: () => {},
};
