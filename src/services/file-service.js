import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import fileHandler from '../utilities/file-handler.js';

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
);

const allowedExtensions = ['jpg', 'gif', 'png', 'txt'];

const uploadFile = async file => {
	try {
		const type = file.name.split('.').pop().toLowerCase();

		if (!allowedExtensions.includes(type)) {
			throw {
				status: 415,
				message: 'Unsupported file extension'
			};
		}

		const buffer = Buffer.from(file.data, 'base64');

		if (type == 'txt') {
			if (buffer.length > 100 * 1024) {
				throw {
					status: 413,
					message: 'The file size exceeds the allowed limit.'
				};
			}
		}

		const uploadingBuffer =
			type === 'txt' ? buffer : await fileHandler.imgHandler(buffer);

		const { data, error } = await supabase.storage
			.from('Files')
			.upload(`${uuidv4()}.${type}`, uploadingBuffer);

		if (error) {
			throw {
				status: 500,
				message: `Something went wrong uploading the file.`
			};
		} else return data.path;
	} catch (err) {
		throw err;
	}
};

export default { uploadFile };
