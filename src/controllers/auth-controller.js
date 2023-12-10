import authService from '../services/auth-service.js';

const signup = async (ws, data) => {
	try {
		const serviceResult = await authService.signup(data);

		const resposne = {
			event: 'SIGN_UP',
			succes: true,
			data: {
				id: serviceResult.id,
				token: serviceResult.accessToken
			}
		};

		ws.send(JSON.stringify(resposne));
	} catch (err) {
		ws.send(
			JSON.stringify({
				event: 'SIGN_UP',
				success: false,
				data: err
			})
		);

		if (err instanceof Error) console.log(err);
	}
};

const signin = async (ws, data) => {
	try {
		const serviceResult = await authService.signin(data);

		const resposne = {
			event: 'SIGN_IN',
			success: true,
			data: {
				id: serviceResult.id,
				token: serviceResult.accessToken
			}
		};

		ws.send(JSON.stringify(resposne));
	} catch (err) {
		ws.send(
			JSON.stringify({
				event: 'SIGN_IN',
				success: false,
				data: err
			})
		);

		if (err instanceof Error) console.log(err);
	}
};

export default { signup, signin };
