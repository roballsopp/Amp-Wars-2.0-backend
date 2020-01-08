import { Sequelize } from 'sequelize';

export default class User extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					allowNull: false,
					defaultValue: sequelize.literal('uuid_generate_v4()'),
					primaryKey: true,
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true,
				},
				password: { type: Sequelize.STRING, allowNull: false },
				firstName: { type: Sequelize.STRING, allowNull: false },
				lastName: { type: Sequelize.STRING, allowNull: false },
				createdAt: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: sequelize.literal('NOW()'),
				},
				updatedAt: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: sequelize.literal('NOW()'),
				},
			},
			{
				sequelize,
				modelName: 'user',
				underscored: true,
				defaultScope: {
					attributes: { exclude: ['password'] },
				},
			}
		);
	}
}
