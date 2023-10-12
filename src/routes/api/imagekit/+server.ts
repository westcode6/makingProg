import { json } from '@sveltejs/kit';
import { IMAGEKIT_PRIVATE_KEY, NODE_ENV } from '$env/static/private';
import { PUBLIC_IMAGEKIT_PUBLIC_KEY } from '$env/static/public';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { imagekit } from '$lib/server/utils/imagekit.js';
import type { RequestEvent } from './$types.js';

const accepted_origins: string[] = [
	'http://localhost:5173',
	'https://kokolity.com',
	'https://www.kokolity.com'
];

export const GET = async (ctx: RequestEvent) => {
	if (!accepted_origins.includes(ctx.url.origin)) {
		return json({
			message: 'ORIGIN_NOT_ALLOWED',
			status: 'error'
		});
	}

	const _xat = ctx.request.headers.get('_xat');

	if (_xat !== PUBLIC_IMAGEKIT_PUBLIC_KEY.replace('public_', 'xat')) {
		return json({ status: 'error', message: 'INVALID_REQUEST' });
	}

	const token = crypto.randomUUID();
	const expire = "dayjs().add(30, 'minutes').unix()";

	const signature = crypto
		.createHmac('sha1', IMAGEKIT_PRIVATE_KEY)
		.update(token + expire)
		.digest('hex');

	return json({
		token,
		expire,
		signature
	});
};

export const DELETE = async (ctx) => {
	if (!accepted_origins.includes(ctx.url.origin)) {
		return json({
			message: 'ORIGIN_NOT_ALLOWED',
			status: 'error'
		});
	}

	const _xat = ctx.request.headers.get('_xat');

	if (_xat !== PUBLIC_IMAGEKIT_PUBLIC_KEY.replace('public_', 'xat')) {
		return json({ status: 'error', message: 'INVALID_REQUEST' });
	}

	try {
		const fileId = ctx.url.searchParams.get('fileId');

		if (!fileId) {
			return json({ status: 'error', message: 'FileId is required' });
		}

		await imagekit.deleteFile(fileId);

		return json({ status: 'success', message: 'File deleted' });
	} catch (error) {
		return json({ status: 'error', message: 'Failed to delete file' });
	}
};
