import commentService from '../services/comment-service.js';

const create = async (ws, data) => {
	try {
		data.user = ws.user;

		const serviceResult = await commentService.createOne(data);

		const resposne = {
			event: 'ADD_COMMENT',
			succes: true,
			data: serviceResult
		};

		ws.send(JSON.stringify(resposne));
	} catch (err) {
		ws.send(
			JSON.stringify({
				event: 'ADD_COMMENT',
				success: false,
				data: err
			})
		);

		if (err instanceof Error) console.log(err);
	}
};

const getPart = async (ws, data) => {
	try {
		const { limit, offset } = data;

		const serviceResult = await commentService.getPart(limit, offset);

		const resposne = {
			event: 'GET_PART',
			succes: true,
			data: serviceResult
		};

		ws.send(JSON.stringify(resposne));
	} catch (err) {
		ws.send(
			JSON.stringify({
				event: 'GET_PART',
				success: false,
				data: err
			})
		);

		if (err instanceof Error) console.log(err);
	}
};

const notify = async ws => {
	try {
		const resposne = {
			event: 'UPDATE'
		};

		ws.send(JSON.stringify(resposne));
	} catch (err) {
		console.log(err);
	}
};

export default { create, getPart, notify };
