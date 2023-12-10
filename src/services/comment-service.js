import Comment from '../models/comment-model.js';
import User from '../models/user-model.js';
import { filePathToFile } from '../utilities/util.js';
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
			newComment.filePath = filePath;
		}

		const createdComment = await Comment.create(newComment);

		return createdComment;
	} catch (err) {
		throw err;
	}
};

const getPart = async (limit, offset) => {
	const comments = await Comment.findAll({
		hierarchy: true,
		include: [{ model: User, attributes: ['name', 'email'] }],
		limit: limit,
		offset: offset
	});

	const result = await filePathToFile(comments);

	return result;
};

export default { createOne, getPart };
