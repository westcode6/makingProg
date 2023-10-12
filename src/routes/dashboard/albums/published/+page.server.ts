import type { IAlbum } from '$lib/interfaces';
import albumModel from '$lib/server/models/album-model';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (ctx) => {
	const user = ctx.locals.user;

	const albums = (await albumModel
		.find({ $and: [{ artist: user?._id }, { status: 'published' }] })
		.select('cover_art title slug featured_artist amount total_views songs created_at')
		.sort({ _id: 'desc' })
		.lean()) as IAlbum[];

	return { albums: structuredClone(albums) };
};
