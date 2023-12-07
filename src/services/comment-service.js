import Comment from '../models/comment-model.js';

const createOne = async data => {
	try {
		const { user, parentId } = data;

		const fileLink = data.file;

		// if (parentId) {
		// 	const parentComment = await getOneById(parentId);

		// 	if (!parentComment) {
		// 		throw {
		// 			status: 409,
		// 			message: `Comment with id ${parentId} not found.`
		// 		};
		// 	}
		// }

		const newComment = {
			text: data.text,
			fileLink: fileLink,
			UserId: user.id
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

const updateParent = async (comment, childId) => {
	try {
		comment.comments = [...(comment.comments || []), childId];

		await comment.save();
	} catch (err) {
		throw err;
	}
};

export default { createOne };
