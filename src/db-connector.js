import { DataTypes, Sequelize } from 'sequelize';
import sequelizeHierarchyNext from 'sequelize-hierarchy-next';
import CommentModel from './models/comment-model.js';
import UserModel from './models/user-model.js';

class DbConnector {
	constructor(config) {
		sequelizeHierarchyNext(Sequelize);
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
		CommentModel.init(this.sequelize);

		UserModel.hasMany(CommentModel, {
			type: DataTypes.UUID,
			onDelete: 'CASCADE'
		});
		CommentModel.belongsTo(UserModel, { allowNull: false });
	}
}

export default DbConnector;
