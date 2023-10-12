import type { IAlbum } from '$lib/interfaces';
import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema<IAlbum>(
	{
		artist: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
			index: true
		},
		artist_name: String,
		featured_artist: String,
		title: String,
		description: String,
		cover_art: {
			url: String,
			thumbnail_url: String,
			ik_file_id: String
		},
		slug: {
			type: String,
			required: true,
			trim: true,
			index: true,
			unique: true
		},
		amount: {
			type: Number,
			default: 0
		},
		currency: {
			type: String,
			default: 'NGN'
		},
		songs: [],
		total_views: {
			type: Number,
			default: 0
		},
		status: {
			type: String,
			enum: ['published', 'draft']
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const albumModel = mongoose.models.Album || mongoose.model('Album', AlbumSchema);

export default albumModel;
