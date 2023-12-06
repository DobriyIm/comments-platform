import authService from '../services/auth-service.js';

const signup = async (ws, data) => {
	try {
		const serviceResult = await authService.signup(data);

		const resposne = {
			type: 'sign-up',
			succes: true,
			data: {
				id: serviceResult.id,
				accessToken: serviceResult.accessToken
			}
		};

		ws.send(JSON.stringify(resposne));
	} catch (err) {
		ws.send(
			JSON.stringify({
				type: 'sign-up',
				success: 'false',
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
			type: 'sign-in',
			success: true,
			data: {
				id: serviceResult.id,
				accessToken: serviceResult.accessToken
			}
		};

		ws.send(JSON.stringify(resposne));
	} catch (err) {
		ws.send(
			JSON.stringify({
				type: 'sign-in',
				success: 'false',
				data: err
			})
		);

		if (err instanceof Error) console.log(err);
	}
};

export default { signup, signin };
