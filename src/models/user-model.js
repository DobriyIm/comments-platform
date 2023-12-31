import { DataTypes, Model } from 'sequelize';
import Comment from './comment-model.js';

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					allowNull: false,
					primaryKey: true
				},
				name: {
					type: DataTypes.STRING,
					unique: true,
					allowNull: false
				},
				email: {
					type: DataTypes.STRING,
					unique: true,
					allowNull: false
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false
				}
			},
			{
				sequelize,
				updatedAt: false
			}
		);
	}
}

export default User;
