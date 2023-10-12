import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { CreateAlbumSchema } from '$lib/schemas';
import { fail, type Actions } from '@sveltejs/kit';
import { generateSlug } from '$lib/utils';
import albumModel from '$lib/server/models/album-model';

export const load: PageServerLoad = async (ctx) => {
	const form = await superValidate(CreateAlbumSchema);

	return { form };
};

export const actions: Actions = {
	create: async (ctx) => {
		const user = ctx.locals.user;
		const form = await superValidate(ctx.request, CreateAlbumSchema);

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
				amount
			} = form.data;

			let slug = generateSlug(form.data.slug);

			const album_exists_with_slug = await albumModel.findOne({ slug });

			if (album_exists_with_slug) {
				const total_albums = await albumModel.estimatedDocumentCount();
				slug = `${slug}-${total_albums + 13}`;
			}

			const album = await albumModel.create({
				artist: user?._id,
				artist_name,
				featured_artist,
				title,
				slug,
				cover_art: {
					ik_file_id: cover_art_fileid,
					thumbnail_url: cover_art_thumbnail_url,
					url: cover_art_url
				},
				status: publish ? 'published' : 'draft',
				description,
				amount: parseFloat(`${amount}`) * 100
			});

			return { form, message: 'Album created successfully', album_slug: album.slug };
		} catch (error) {
			return fail(500, {
				form,
				message: 'Failed to created album. Please try again or contact us.'
			});
		}
	}
};
