import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
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
		}

		return data.path;
	} catch (err) {
		throw err;
	}
};

const toUrl = async filePath => {
	try {
		const { data, error } = await supabase.storage
			.from('Files')
			.createSignedUrl(filePath, 60 * 5);

		if (error) {
			console.log(error);
			throw {
				status: 500,
				message: `Something went wrong on server side`
			};
		}

		return data.signedUrl;
	} catch (err) {
		throw err;
	}
};

export default { uploadFile, toUrl };