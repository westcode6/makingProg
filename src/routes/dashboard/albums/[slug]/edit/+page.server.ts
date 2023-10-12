import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from '../$types';
import { EditAlbumSchema } from '$lib/schemas';
import albumModel from '$lib/server/models/album-model';
import { error } from '@sveltejs/kit';
import type { IAlbum } from '$lib/interfaces';
import { fail, type Actions } from '@sveltejs/kit';
import { generateSlug } from '$lib/utils';
import { imagekit } from '$lib/server/utils';

export const load: PageServerLoad = async (ctx) => {
	const user = ctx.locals.user;
	const form = await superValidate(EditAlbumSchema);

	const album = (await albumModel
		.findOne({
			$and: [{ artist: user?._id }, { slug: ctx.params.slug }]
		})
		.select('-songs -total_views -artist')
		.lean()) as IAlbum;

	if (!album) {
		throw error(404, {
			message:
				"The album you are looking for has either been moved, deleted or you don't have ownership for it"
		});
	}

	return { form, album: structuredClone(album) };
};

export const actions: Actions = {
	update: async (ctx) => {
		const user = ctx.locals.user;
		const form = await superValidate(ctx.request, EditAlbumSchema);

		if (!form.valid) {
			return fail(400, {
				form,
				message: 'Please enter all the required information for this album'
			});
		}

		try {
			const {
				artist_name,
				featured_artist,
				title,
				cover_art_thumbnail_url,
				cover_art_fileid,
				cover_art_url,
				publish,
				description,
				slug,
				amount
			} = form.data;

			const album = await albumModel.findOne({
				$and: [{ artist: user?._id }, { slug: ctx.params.slug }]
			});

			if (!album) {
				return fail(400, {
					form,
					message:
						"The album you are trying to update has either been moved, deleted or you don't have ownership for it"
				});
			}

			if (slug) {
				let slug_gen = generateSlug(slug);

				const album_exists_with_slug = (await albumModel
					.findOne({ slug: slug_gen })
					.select('_id')
					.lean()) as IAlbum;

				if (album_exists_with_slug) {
					// check if not current album that 'owns' the slug:
					if (!album._id.equals(album_exists_with_slug._id)) {
						const total_albums = await albumModel.estimatedDocumentCount();
						slug_gen = `${slug_gen}-${total_albums + 13}`;
					}
				}

				album.slug = slug_gen;
			}

			// if cover art image is uploaded (changed):
			if (cover_art_url) {
				await imagekit.deleteFile(album.cover_art.ik_file_id);

				album.cover_art.url = cover_art_url;
				album.cover_art.thumbnail_url = cover_art_thumbnail_url;
				album.cover_art.ik_file_id = cover_art_fileid;
			}

			if (artist_name) album.artist_name = artist_name;
			if (featured_artist) album.featured_artist = featured_artist;
			if (title) album.title = title;
			if (description) album.description = description;
			if (amount) album.amount = parseFloat(`${amount}`) * 100;
			album.status = publish ? 'published' : 'draft';

			const new_album = await album.save();

			return {
				form,
				message: 'Album updated successfully',
				new_slug: new_album.slug
			};
		} catch (error) {
			return fail(500, {
				form,
				message: 'Failed to update album. Please try again or contact us.'
			});
		}
	}
};
