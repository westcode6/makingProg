import type { IAlbum } from '$lib/interfaces';
import albumModel from '$lib/server/models/album-model';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (ctx) => {
	const { album_slug } = ctx.params;
	const artist_id = ctx.locals.artist_page?._id;

	const album = (await albumModel
		.findOne({ slug: album_slug })
		.select('-cover_art.ik_file_id -artist -status')
		.lean()) as IAlbum;

	if (!album) {
		throw error(404, { message: 'Oops! There is no album record found for the link you followed' });
	}

	return {
		album: structuredClone(album)
	};
};
