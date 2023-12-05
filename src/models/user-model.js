import { DataTypes, Model } from 'sequelize';

class User extends Model {
	static init(sequelize) {
		super.init(
			{
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
