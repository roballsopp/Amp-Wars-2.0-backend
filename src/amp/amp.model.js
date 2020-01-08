export default class AmpModel {
	constructor(sequelize) {
		this.sequelize = sequelize;
		this.ampTable = sequelize.model('amp');
	}

	async findById(id) {
		return this.ampTable.findOne({ where: { id } });
	}
}
