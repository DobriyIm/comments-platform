import Comment from '../models/comment-model.js';
import fileService from './file-service.js';

const createOne = async data => {
	try {
		const { user, file } = data;

		const newComment = {
			text: data.text,
			UserId: user.id,
			parentId: data.parentId
		};

		if (file) {
			const filePath = await fileService.uploadFile(file);
			newComment.fileLink = filePath;
		}

		const createdComment = await Comment.create(newComment);

		return createdComment;
	} catch (err) {
		throw err;
	}
};

const getOneById = async id => {
	try {
		const foundComment = Comment.findByPk(id);

		return foundComment;
	} catch (err) {
		throw err;
	}
};

const getAll = async () => {
	const resp = await Comment.findAll({
		include: [{ model: Comment, as: 'comments', nested: true }]
	});
	console.log(resp);
};

export default { createOne, getAll };
