import { CreateArtistProfileSchema } from '$lib/schemas';
import { userModel } from '$lib/server/models';
import { generateSlug } from '$lib/utils';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const actions: Actions = {
	createArtistProfile: async (ctx) => {
		const user = ctx.locals.user;
		const form = await superValidate(ctx.request, CreateArtistProfileSchema);

		if (!form.valid) {
			return fail(400, {
				form,
				message: 'Please enter the required information to create your artist profile'
			});
		}

		if (user?.artist_name) {
			return fail(401, {
				form,
				message:
					'Artist profile has already been created for you. Please contact us or proceed to your dashboard'
			});
		}

		try {
			const { artist_name, bio, profile_url, profile_fileid, profile_thumbnail_url } = form.data;

			let slug = generateSlug(artist_name);

			const user_exists_with_slug = await userModel.findOne({ slug }).select('_id').lean();

			if (user_exists_with_slug) {
				const total_users = await userModel.estimatedDocumentCount();
				slug = `${slug}${total_users + 13}`;
			}

			await userModel.findByIdAndUpdate(`${user?._id}`, {
				$set: {
					artist_name,
					bio,
					slug,
					profile_pic: {
						url: profile_url,
						thumbnail_url: profile_thumbnail_url,
						ik_file_id: profile_fileid
					}
				}
			});

			return { form, message: 'Your Artist profile has been created successfully!' };
		} catch (error) {
			return fail(500, {
				form,
				message: 'Failed to create your Artist profile. Please try again or contact us.'
			});
		}
	}
};
