import sharp from 'sharp';

const imgHandler = async data => {
	const resizedBuffer = sharp(data)
		.resize(320, 240, { fit: 'inside', withoutEnlargement: true })
		.toBuffer();

	return resizedBuffer;
};

export default { imgHandler };
