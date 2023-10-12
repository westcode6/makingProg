import { UpdateArtistProfileSchema } from '$lib/schemas';
import { userModel } from '$lib/server/models';
import { imagekit } from '$lib/server/utils';
import { generateSlug } from '$lib/utils';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async (ctx) => {
	const form = await superValidate(UpdateArtistProfileSchema);

	return { form };
};

export const actions: Actions = {
	editProfile: async (ctx) => {
		const form = await superValidate(ctx.request, UpdateArtistProfileSchema);

		if (!form.valid) {
			return fail(400, {
				form,
				message: 'Please fill all the required fields to update your profile'
			});
		}

		try {
			const user = await userModel.findById(ctx.locals.user?._id);

			if (!user) {
				return fail(400, {
					form,
					message: 'Failed to process this request. Please login to your dashboard and try again.'
				});
			}

			const { profile_fileid, profile_thumbnail_url, profile_url, artist_name, bio, slug } =
				form.data;

			if (profile_url) {
				await imagekit.deleteFile(`${user?.profile_pic?.ik_file_id}`);

				user.profile_pic.url = profile_url;
				user.profile_pic.thumbnail_url = profile_thumbnail_url;
				user.profile_pic.ik_file_id = profile_fileid;
			}

			if (slug) {
				let slug_gen = generateSlug(slug);

				const user_exists_with_slug = (await userModel
					.findOne({ slug: slug_gen })
					.select('_id')
					.lean()) as any;

				if (user_exists_with_slug) {
					// check if not current user that 'owns' the slug:
					if (!user._id.equals(user_exists_with_slug?._id)) {
						const total_users = await userModel.estimatedDocumentCount();
						slug_gen = `${slug_gen}${total_users + 13}`;
					}
				}

				user.slug = slug_gen;
			}

			if (artist_name) user.artist_name = artist_name;
			if (bio) user.bio = bio;

			await user.save();

			return { form, message: 'Profile updated successfully' };
		} catch (error) {
			return fail(500, {
				form,
				message: 'We could not update your profile. Please try again or contact us.'
			});
		}
	}
};
