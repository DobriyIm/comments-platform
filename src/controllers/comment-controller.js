import commentService from '../services/comment-service.js';

const create = async (ws, data) => {
	try {
		data.user = ws.user;

		await commentService.createOne(data);

		const resposne = {
			type: 'ADD_COMMENT',
			succes: true
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

export default { create };
