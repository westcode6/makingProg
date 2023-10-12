import type { ISong } from '$lib/interfaces';
import songModel from '$lib/server/models/song-model';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (ctx) => {
	const { single_slug } = ctx.params;

	const single = (await songModel
		.findOne({ $and: [{ slug: single_slug }, { status: 'published' }, { song_type: 'single' }] })
		.select('-song_upload -cover_art.ik_file_id -status -artist')
		.lean()) as ISong;

	if (!single) {
		throw error(404, { message: 'Oops! There is no single found for the link you followed' });
	}

	return { single: structuredClone(single) };
};
