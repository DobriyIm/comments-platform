import Comment from '../models/comment-model.js';

const createOne = async data => {
	try {
		const { user } = data;

		const fileLink = data.file;

		const newComment = {
			text: data.text,
			fileLink: fileLink,
			UserId: user.id,
			parentId: data.parentId
		};

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
