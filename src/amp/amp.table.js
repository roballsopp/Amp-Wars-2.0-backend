import { Sequelize } from 'sequelize';

export default class Amp extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					allowNull: false,
					defaultValue: sequelize.literal('uuid_generate_v4()'),
					primaryKey: true,
				},
				src: { type: Sequelize.STRING, allowNull: false },
				title: { type: Sequelize.STRING, allowNull: false },
				description: { type: Sequelize.STRING },
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
				modelName: 'amp',
				underscored: true,
			}
		);
	}
}
