const bcrypt = require('bcrypt');

module.exports = {
	up: queryInterface => {
		return queryInterface.sequelize.transaction(async transaction => {
			if (!process.env.ADMIN_PASSWORD) throw new Error('ADMIN_PASSWORD env variable required to generate new user');
			if (!process.env.ADMIN_EMAIL) throw new Error('ADMIN_EMAIL env variable required to generate new user');

			const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

			await queryInterface.sequelize.query(
				`INSERT INTO users (email, password, first_name, last_name) VALUES (:email, :password, :firstName, :lastName);`,
				{
					transaction,
					replacements: {
						email: process.env.ADMIN_EMAIL,
						password: passwordHash,
						firstName: process.env.ADMIN_FIRST_NAME || 'Admin',
						lastName: process.env.ADMIN_LAST_NAME || 'Adminington',
					},
				}
			);
		});
	},
	down: queryInterface => {
		return queryInterface.sequelize.transaction(async transaction => {
			if (!process.env.ADMIN_EMAIL) throw new Error('ADMIN_EMAIL env variable required to generate new user');

			await queryInterface.sequelize.query(`DELETE FROM users WHERE email = :email`, {
				transaction,
				replacements: {
					email: process.env.ADMIN_EMAIL,
				},
			});
		});
	},
};
