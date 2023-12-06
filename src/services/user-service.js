import bcrypt from 'bcrypt';
import User from '../models/user-model.js';

const createOne = async userData => {
	try {
		const { email } = userData;

		const existingUser = await User.findOne({
			where: { email: email }
		});

		if (existingUser) {
			throw {
				status: 409,
				message: `User with email '${email}' already exists`
			};
		}

		const hashedPassword = await bcrypt.hash(userData.password, 10);

		const newUser = {
			name: userData.name,
			email: userData.email,
			password: hashedPassword
		};

		const createdUser = await User.create(newUser);

		return createdUser;
	} catch (err) {
		throw err;
	}
};

const getOneByEmail = async email => {
	try {
		const foundUser = await User.findOne({ where: { email: email } });

		return foundUser;
	} catch (err) {
		throw err;
	}
};

const getOneById = async id => {
	try {
		const foundUser = await User.findByPk(id);

		return foundUser;
	} catch (err) {
		throw err;
	}
};

export default { createOne, getOneByEmail, getOneById };
