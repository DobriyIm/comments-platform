import authService from '../services/auth-service.js';

const authenticate = async (ws, msg, next) => {
	try {
		const { token } = JSON.parse(msg);

		ws.user = await authService.authenticate(token);

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
