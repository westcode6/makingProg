import type { ISong } from '$lib/interfaces';
import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema<ISong>(
	{
		// required:
		artist: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			index: true,
			required: true
		},
		artist_name: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		slug: {
			type: String,
			required: true,
			trim: true,
			index: true,
			unique: true
		},
		song_type: {
			type: String,
			enum: ['single', 'album'],
			required: true
		},
		album_slug: {
			type: String,
			index: true
		},

		// not required:
		featured_artist: String,
		genre: String,
		description: String,
		amount: {
			type: Number,
			default: 0
		},
		currency: {
			type: String,
			default: 'NGN'
		},
		cover_art: {
			url: String,
			thumbnail_url: String,
			ik_file_id: String
		},
		song_upload: {
			url: String,
			ik_file_id: String
		},
		status: {
			type: String,
			enum: ['published', 'draft']
		},
		total_views: {
			type: Number,
			default: 0
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const songModel = mongoose.models.Song || mongoose.model('Song', SongSchema);

export default songModel;
