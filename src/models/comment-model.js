import { DataTypes, Model } from 'sequelize';

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
				}
			},
			{
				sequelize,
				updatedAt: false,
				hierarchy: { as: 'parent', childrenAs: 'comments' }
			}
		);
	}
}

export default Comment;
