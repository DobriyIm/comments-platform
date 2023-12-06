import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

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
