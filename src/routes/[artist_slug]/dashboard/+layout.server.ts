import { superValidate } from 'sveltekit-superforms/server';
import type { LayoutServerLoad } from './$types';
import { CreateArtistProfileSchema } from '$lib/schemas';

export const load: LayoutServerLoad = async (ctx) => {
	const user = ctx.locals.user;
	let createUsernameForm;

	if (!user?.artist_name) {
		createUsernameForm = await superValidate(CreateArtistProfileSchema);
	}

	return {
		createUsernameForm,
		user: structuredClone({
			slug: user?.slug,
			email: user?.email,
			artist_name: user?.artist_name,
			has_verified_email: user?.has_verified_email,
			created_at: user?.created_at,
			profile_pic: { url: user?.profile_pic?.url, thumbnail_url: user?.profile_pic?.thumbnail_url },
			bio: user?.bio
		})
	};
};
