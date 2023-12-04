import bcrypt from 'bcrypt';

const users = [];

const createOne = async userData => {
	try {
		const { email } = userData;

		const existingUser = users.find(user => user.email == email);

		if (existingUser) {
			throw {
				status: 409,
				message: `User with email '${email}' already exists`
			};
		}

		const hashedPassword = await bcrypt.hash(userData.password, 10);

		const newUser = {
			id: users.length + 1,
			name: userData.name,
			email: userData.email,
			password: hashedPassword
		};

		users.push(newUser);

		return newUser;
	} catch (err) {
		throw err;
	}
};

const findUser = email => {
	return users.find(u => u.email === email);
};

export default { createOne, findUser };
