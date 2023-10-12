import type { ISong } from '$lib/interfaces/song-interface.js';
import songModel from '$lib/server/models/song-model.js';
import { json } from '@sveltejs/kit';

export const GET = async (ctx) => {
	// todo: fetch from Redis cache

	const songs = (await songModel
		.find({ album_slug: ctx.params.slug })
		.sort({ _id: 'desc' })
		.select('cover_art.thumbnail_url title slug genre featured_artist created_at')
		.lean()) as ISong[];

	return json({
		songs
	});
};
