import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import songModel from '$lib/server/models/song-model';
import { generateSlug } from '$lib/utils';
import { UploadSongSchema } from '$lib/schemas';
import albumModel from '$lib/server/models/album-model';

export const load: PageServerLoad = async (ctx) => {
	const form = await superValidate(UploadSongSchema);

	return { form };
};

export const actions: Actions = {
	upload: async (ctx) => {
		const form = await superValidate(ctx.request, UploadSongSchema);
		const user = ctx.locals.user;
		const album_slug = ctx.params.slug;

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
				publish
			} = form.data;

			// check for album ownership:
			const album = await albumModel
				.findOne({ $and: [{ artist: user?._id }, { slug: album_slug }] })
				.select('songs');

			if (!album) {
				return fail(400, {
					form,
					message:
						'Sorry, the album you are trying to upload this song to has either been moved,  deleted or you do not have ownership for it.'
				});
			}

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
				song_type: 'album',
				album_slug,
				genre,
				description,
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

			// add song to album.songs:
			album.songs = [song._id, ...album.songs];
			await album.save();

			return {
				status: 'success',
				message: 'Song uploaded and added to album successfully',
				form,
				song_slug: song?.slug
			};
		} catch (error) {
			return fail(500, {
				form,
				message: 'Failed to add song to album. Please try again or contact us.'
			});
		}
	}
};
