import { Sequelize } from 'sequelize';
import UserModel from './models/user-model.js';

class DbConnector {
	constructor(config) {
		this.sequelize = new Sequelize(config);
		this.initModels();
	}

	async connect() {
		try {
			await this.sequelize.authenticate();
			console.log('Connection has been established successfully.');

			await this.sequelize.sync();
		} catch (err) {
			throw err;
		}
	}

	initModels() {
		UserModel.init(this.sequelize);
	}
}

export default DbConnector;
