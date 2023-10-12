import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { UploadSingleSchema } from '$lib/schemas/single-schema';
import songModel from '$lib/server/models/song-model';
import { generateSlug } from '$lib/utils';

export const load: PageServerLoad = async (ctx) => {
	const form = await superValidate(UploadSingleSchema);

	return { form };
};

export const actions: Actions = {
	upload: async (ctx) => {
		const form = await superValidate(ctx.request, UploadSingleSchema);
		const user = ctx.locals.user;

		if (!form.valid) {
			return fail(400, {
				form,
				message: 'Please enter all the required information for this song'
			});
		}

		try {
			const {
				cover_art_fileid,
				cover_art_thumbnail_url,
				cover_art_url,
				song_fileid,
				song_url,
				artist_name,
				featured_artist,
				title,
				genre,
				description,
				amount,
				publish
			} = form.data;

			let slug = generateSlug(form.data.slug);

			// check if slug exists:
			const song_exists_with_slug = await songModel.findOne({ slug });

			if (song_exists_with_slug) {
				const total_songs = await songModel.estimatedDocumentCount();
				slug = `${slug}-${total_songs + 13}`;
			}

			const song = await songModel.create({
				artist: user?._id,
				artist_name,
				featured_artist,
				title,
				slug,
				song_type: 'single',
				genre,
				description,
				amount: +amount * 100,
				cover_art: {
					url: cover_art_url,
					thumbnail_url: cover_art_thumbnail_url,
					ik_file_id: cover_art_fileid
				},
				song_upload: {
					url: song_url,
					ik_file_id: song_fileid
				},
				status: publish ? 'published' : 'draft'
			});

			return {
				status: 'success',
				message: 'Single uploaded successfully',
				form,
				song_slug: song.slug
			};
		} catch (error) {
			return fail(500, {
				form,
				message: 'Failed to upload single. Please try again or contact us.'
			});
		}
	}
};
