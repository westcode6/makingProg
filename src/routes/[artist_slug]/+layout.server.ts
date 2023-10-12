import { userModel } from '$lib/server/models';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { generateSlug } from '$lib/utils';

interface IArtistPageData {
	_id: string;
	profile_pic: { url: string; thumbnail_url: string };
	artist_name: string;
	slug: string;
	bio: string;
	created_at: Date;
}

export const load: LayoutServerLoad = async (ctx) => {
	/**
	 * fix the bug in this logic;
	 * bug: artist_page not accessible in children routes;
	 */
	const { artist_slug } = ctx.params;

	if (ctx.locals.artist_page?._id) {
		return { artist: ctx.locals.artist_page };
	}

	const artist = (await userModel
		.findOne({ slug: generateSlug(artist_slug) })
		.select('profile_pic artist_name bio slug created_at')
		.lean()) as IArtistPageData;

	if (!artist) {
		throw error(404, {
			message: `Oops! The artist's page you are looking for does not exist or has been moved`
		});
	}

	ctx.locals.artist_page = artist;

	return { artist: structuredClone(artist) };
};
