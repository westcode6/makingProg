import type { IUser } from '$lib/interfaces';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<IUser>(
	{
		artist_name: String,
		profile_pic: {
			url: String,
			thumbnail_url: String,
			ik_file_id: String
		},
		slug: {
			type: String,
			index: true,
			unique: true,
			trim: true,
			lowercase: true
		},
		bio: String,
		email: {
			type: String,
			required: true,
			index: true,
			trim: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true
		},

		verify_otp: String,
		verify_uuid: {
			type: String,
			index: true
		},
		has_verified_email: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

export const userModel = mongoose.models.User || mongoose.model('User', UserSchema);
