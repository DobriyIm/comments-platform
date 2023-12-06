import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from './user-service.js';

const signup = async data => {
	try {
		const createdUser = await userService.createOne(data);

		const payload = {
			sub: createdUser.id,
			name: createdUser.name,
			email: createdUser.email
		};

		const accessToken = await jwt.sign(
			payload,
			process.env.JWT_TOKEN_SECRET_KEY
		);

		return { id: createdUser.id, accessToken };
	} catch (err) {
		throw err;
	}
};

const signin = async data => {
	try {
		const { email, password } = data;

		const foundUser = await userService.getOneByEmail(email);

		if (!foundUser) {
			throw {
				status: 404,
				maessage: `User with email ${email} not found.`
			};
		}

		const savedPassword = foundUser.password;

		if (!(await bcrypt.compare(password, savedPassword))) {
			throw {
				status: 400,
				message: 'Incorrect password'
			};
		}

		const payload = {
			sub: foundUser.id,
			name: foundUser.name,
			email: foundUser.email
		};

		const accessToken = await jwt.sign(
			payload,
			process.env.JWT_TOKEN_SECRET_KEY
		);

		return { id: foundUser.id, accessToken };
	} catch (err) {
		throw err;
	}
};

const authenticate = async authHeader => {
	try {
		if (!authHeader) {
			throw {
				status: 401,
				message: 'Authorization header not provided'
			};
		}

		const tokenParts = authHeader.split(' ');
		if (tokenParts[0] != 'Bearer') {
			throw {
				status: 401,
				message: "Authorization scheme 'Bearer' required"
			};
		}

		const token = tokenParts[1];
		if (!token) {
			throw { status: 401, message: 'Token not provided' };
		}

		const { sub: id } = await jwt.verify(
			token,
			process.env.JWT_TOKEN_SECRET_KEY
		);

		const foundUser = await userService.getOneById(id);

		if (!foundUser) {
			throw {
				status: 404,
				message: `User with id '${id}' not found`
			};
		}

		return foundUser;
	} catch (err) {
		throw err;
	}
};

export default { signup, signin, authenticate };
