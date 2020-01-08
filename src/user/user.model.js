export default class UserModel {
	constructor(sequelize) {
		this.sequelize = sequelize;
		this.userTable = sequelize.model('user');
	}

	async findById(id) {
		return this.userTable.findOne({ where: { id } });
	}
}
