import Comment from '../models/comment-model.js';
import User from '../models/user-model.js';
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

const getOneById = async id => {
	try {
		const foundComment = Comment.findByPk(id);

		return foundComment;
	} catch (err) {
		throw err;
	}
};

const getAll = async () => {
	const dbResult = await Comment.findAll({
		hierarchy: true,
		include: [{ model: User, attributes: ['name', 'email'] }]
	});

	const comments = transformFileField(dbResult);

	return comments;
};

const transformFileField = async comments => {
	const promises = comments.map(async comment => {
		comment.filePath = await fileService.toUrl(comment.filePath);

		if (comment.comments) {
			comment.comments = await transformFileField(comment.comments);
		}

		return comment;
	});

	return await Promise.all(promises);
};

export default { createOne, getAll };
