import type { ISong } from '$lib/interfaces';
import songModel from '$lib/server/models/song-model';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (ctx) => {
	const user = ctx.locals.user;

	const songs = (await songModel
		.find({ $and: [{ artist: user?._id }, { status: 'draft' }, { song_type: 'single' }] })
		.select('title slug genre featured_artist amount created_at cover_art.thumbnail_url song_type')
		.sort({ _id: 'desc' })
		.lean()) as ISong[];

	return { songs: structuredClone(songs) };
};
