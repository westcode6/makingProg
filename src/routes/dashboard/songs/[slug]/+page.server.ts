import type { ISong } from '$lib/interfaces';
import songModel from '$lib/server/models/song-model';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { DeleteSongSchema } from '$lib/schemas';

export const load: PageServerLoad = async (ctx) => {
	const user = ctx.locals.user;
	const deleteSongForm = await superValidate(DeleteSongSchema);

	const song = (await songModel
		.findOne({ $and: [{ artist: user?._id }, { slug: ctx.params.slug }] })
		.select('-artist')
		.lean()) as ISong;

	if (!song) {
		throw error(404, {
			message:
				'The song you are looking for has either been moved, deleted or you are not the owner'
		});
	}

	return { song: structuredClone(song), deleteSongForm };
};
