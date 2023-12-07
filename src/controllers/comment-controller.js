import commentService from '../services/comment-service.js';

const create = async (ws, data) => {
	try {
		data.user = ws.user;

		const serviceResult = await commentService.createOne(data);

		const resposne = {
			type: 'ADD_COMMENT',
			succes: true,
			data: serviceResult
		};

		ws.send(JSON.stringify(resposne));
	} catch (err) {
		ws.send(
			JSON.stringify({
				event: 'ADD_COMMENT',
				success: 'false',
				data: err
			})
		);

		if (err instanceof Error) console.log(err);
	}
};

const sendAll = async (ws, data) => {
	try {
		await commentService.getAll();
	} catch (err) {
		ws.send(
			JSON.stringify({
				event: 'ADD_COMMENT',
				success: 'false',
				data: err
			})
		);

		if (err instanceof Error) console.log(err);
	}
};

export default { create };
