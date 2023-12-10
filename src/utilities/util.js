import fileService from '../services/file-service.js';

export const filePathToFile = async comments => {
	const commentsWithBase64 = await Promise.all(
		comments.map(async comment => {
			if (comment.dataValues.filePath) {
				const base64Data = await fileService.toBase64(
					comment.dataValues.filePath
				);
				comment.dataValues.file = base64Data;
				delete comment.dataValues.filePath;
			}
			if (comment.dataValues.comments) {
				await filePathToFile(comment.dataValues.comments);
			}
			return comment;
		})
	);

	return commentsWithBase64;
};
