import type { IUser } from '$lib/interfaces/user-interface.js';
import albumModel from '$lib/server/models/album-model.js';
import { userModel } from '$lib/server/models/user-model.js';
import { error, json } from '@sveltejs/kit';

export const GET = async (ctx) => {
	const artist_slug = ctx.params.artist_slug;
	const page = parseFloat(`${ctx.url.searchParams.get('page')}`) || 1;
	const limit = parseFloat(`${ctx.url.searchParams.get('size')}`) || 0;

	const artist = (await userModel.findOne({ slug: artist_slug }).select('_id').lean()) as IUser;

	if (!artist) {
		throw error(404, { message: 'Artist page not found' });
	}

	const albums = await albumModel
		.find({ $and: [{ artist: artist._id }, { status: 'published' }] })
		.select('-artist -cover_art.ik_file_id -songs')
		.sort({ _id: 'desc' })
		.skip((page - 1) * limit)
		.limit(limit)
		.lean();

	const total_albums = await albumModel
		.estimatedDocumentCount({
			$and: [{ artist: artist._id }, { status: 'published' }]
		})
		.select('_id')
		.lean();

	return json({
		data: albums,
		page,
		size: limit,
		total: total_albums
	});
};
