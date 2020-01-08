import { AmpModel, AmpTable } from './amp';

export default sequelize => {
	AmpTable.init(sequelize);

	return {
		amp: new AmpModel(sequelize),
	};
};
