import { DataTypes, Model } from 'sequelize';
import User from './user-model.js';

class Comment extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					allowNull: false,
					primaryKey: true
				},
				text: {
					type: DataTypes.TEXT,
					allowNull: false
				},
				fileLink: {
					type: DataTypes.STRING,
					allowNull: true
				},
				comments: {
					type: DataTypes.ARRAY(DataTypes.UUID)
				}
			},
			{
				sequelize,
				updatedAt: false
			}
		);
	}
}

export default Comment;
