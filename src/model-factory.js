import { AmpModel, AmpTable } from './amp';
import { UserModel, UserTable } from './user';

export default sequelize => {
	AmpTable.init(sequelize);
	UserTable.init(sequelize);

	return {
		amp: new AmpModel(sequelize),
		user: new UserModel(sequelize),
	};
};
