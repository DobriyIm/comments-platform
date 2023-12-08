import authService from '../services/auth-service.js';

const authenticate = async (ws, msg, next) => {
	try {
		const { token } = JSON.parse(msg);

		const foundUser = await authService.authenticate(token);
		ws.user = {
			id: foundUser.id,
			name: foundUser.name,
			email: foundUser.email
		};

		next();
	} catch (err) {
		ws.send(
			JSON.stringify({
				type: 'auth',
				success: 'false',
				data: err
			})
		);

		if (err instanceof Error) console.log(err);
	}
};

export default { authenticate };
