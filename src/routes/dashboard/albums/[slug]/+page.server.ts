import albumModel from '$lib/server/models/album-model';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IAlbum } from '$lib/interfaces';

export const load: PageServerLoad = async (ctx) => {
	const user = ctx.locals.user;

	// Todo: fetch from Redis cache instead

	const album = (await albumModel
		.findOne({ $and: [{ artist: user?._id }, { slug: ctx.params.slug }] })
		.select('-artist')
		.lean()) as IAlbum;

	if (!album) {
		throw error(404, {
			message: 'The album you are looking for has either been moved or does not exist'
		});
	}

	return { album: structuredClone(album) };
};
