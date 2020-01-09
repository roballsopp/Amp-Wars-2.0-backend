export default class UserModel {
	constructor(sequelize) {
		this.sequelize = sequelize;
		this.userTable = sequelize.model('user');
	}

	async findById(id) {
		return this.userTable.findOne({ where: { id } });
	}

	async findByEmailWithPassword(email) {
		return this.userTable.unscoped().findOne({ where: { email } });
	}

	async findByEmail(email) {
		return this.userTable.findOne({ where: { email } });
	}
}
