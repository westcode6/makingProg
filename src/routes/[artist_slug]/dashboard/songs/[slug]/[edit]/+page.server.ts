import { fail, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import songModel from '$lib/server/models/song-model';
import { generateSlug } from '$lib/utils';
import { DeleteSongSchema, EditSongSchema } from '$lib/schemas';
import type { ISong } from '$lib/interfaces';
import { imagekit } from '$lib/server/utils';
import bcrypt from 'bcryptjs';

export const load: PageServerLoad = async (ctx) => {
	const user = ctx.locals.user;
	const form = await superValidate(EditSongSchema);

	const song = (await songModel
		.findOne({ $and: [{ artist: user?._id }, { slug: ctx.params.slug }] })
		.lean()) as ISong;

	if (!song) {
		throw error(404, {
			message:
				'The song you are looking for has either been moved, deleted or you are not the owner'
		});
	}

	return { form, song: structuredClone(song) };
};

export const actions: Actions = {
	update: async (ctx) => {
		const form = await superValidate(ctx.request, EditSongSchema);
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
				slug,
				genre,
				description,
				amount,
				publish
			} = form.data;

			const song = await songModel.findOne({
				$and: [{ artist: user?._id }, { slug: ctx.params.slug }]
			});

			if (!song) {
				return fail(400, {
					form,
					message:
						'The song you are looking for has either been moved, deleted or you are not the owner'
				});
			}

			if (slug) {
				let slug_gen = generateSlug(slug);

				// check if slug exists:
				const song_exists_with_slug = (await songModel
					.findOne({ slug: slug_gen })
					.select('_id')
					.lean()) as ISong;

				if (song_exists_with_slug) {
					// check if not song owns this slug:
					if (!song._id.equals(song_exists_with_slug._id)) {
						const total_songs = await songModel.estimatedDocumentCount();
						slug_gen = `${slug_gen}-${total_songs + 13}`;
					}
				}

				song.slug = slug_gen;
			}

			let files_to_delete = [];

			if (cover_art_url) {
				files_to_delete.push(song.cover_art.ik_file_id);

				song.cover_art.url = cover_art_url;
				song.cover_art.thumbnail_url = cover_art_thumbnail_url;
				song.cover_art.ik_file_id = cover_art_fileid;
			}

			if (song_url) {
				files_to_delete.push(song.song_upload.ik_file_id);

				song.song_upload.url = song_url;
				song.song_upload.ik_file_id = song_fileid;
			}

			if (files_to_delete.length > 0) {
				await imagekit.bulkDeleteFiles(files_to_delete);
			}

			if (artist_name) song.artist_name = artist_name;
			if (featured_artist) song.featured_artist = featured_artist;
			if (title) song.title = title;
			if (genre) song.genre = genre;
			if (description) song.description = description;
			if (amount) song.amount = +amount * 100;
			song.status = publish ? 'published' : 'draft';

			const updated_song = await song.save();

			return {
				status: 'success',
				message: 'Song has been updated successfully',
				form,
				new_slug: updated_song.slug
			};
		} catch (error) {
			return fail(500, {
				form,
				message: 'Failed to update song. Please try again or contact us.'
			});
		}
	},
	delete: async (ctx) => {
		const user = ctx.locals.user;
		const deleteSongForm = await superValidate(ctx.request, DeleteSongSchema);

		if (!deleteSongForm.valid) {
			return fail(400, {
				deleteSongForm,
				message: 'For security reasons, please enter your password'
			});
		}

		try {
			const { password } = deleteSongForm.data;

			const password_match = await bcrypt.compare(password, `${user?.password}`);

			if (!password_match) {
				return fail(400, {
					deleteSongForm,
					message:
						'You entered a wrong password. Please enter your correct password to delete this song.'
				});
			}

			const song = (await songModel
				.findOne({ $and: [{ artist: user?._id }, { slug: ctx.params.slug }] })
				.select('cover_art song_upload')
				.lean()) as ISong;

			if (!song) {
				return fail(400, {
					deleteSongForm,
					message:
						'The song you are trying to delete has either be moved, deleted or you do not have ownership of it'
				});
			}

			await imagekit.bulkDeleteFiles([
				`${song.cover_art.ik_file_id}`,
				`${song.song_upload.ik_file_id}`
			]);

			await songModel.findOneAndDelete({ slug: ctx.params.slug });

			return { deleteSongForm, message: 'Song has been deleted successfully' };
		} catch (error) {
			return fail(500, { message: 'Failed to delete this song. Please try again or contact us' });
		}
	}
};
