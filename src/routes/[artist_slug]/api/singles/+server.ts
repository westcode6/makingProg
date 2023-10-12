import type { IUser } from '$lib/interfaces/user-interface.js';
import songModel from '$lib/server/models/song-model.js';
import { userModel } from '$lib/server/models/user-model.js';
import { error, json } from '@sveltejs/kit';

/**
 * GET albums for artist page
 * /api/[artist_slug]/albums?size=&page=
 */
export const GET = async (ctx) => {
	const artist_slug = ctx.params.artist_slug;
	const limit: number = parseFloat(`${ctx.url.searchParams.get('size')}`) || 0;
	const page: number = parseFloat(`${ctx.url.searchParams.get('page')}`) || 1;

	const artist = (await userModel.findOne({ slug: artist_slug }).select('_id').lean()) as IUser;

	if (!artist) {
		throw error(404, { message: 'Artist page not found' });
	}

	const singles = await songModel
		.find({ $and: [{ artist: artist._id }, { song_type: 'single' }, { status: 'published' }] })
		.select('-artist -song_type -cover_art.ik_file_id -song_upload -status')
		.sort({ _id: 'desc' })
		.skip((page - 1) * limit)
		.limit(limit)
		.lean();

	const total_singles = await songModel
		.estimatedDocumentCount({
			$and: [{ artist: artist._id }, { song_type: 'single' }, { status: 'published' }]
		})
		.select('_id')
		.lean();

	return json({
		data: singles,
		page,
		size: limit,
		total: total_singles
	});
};
