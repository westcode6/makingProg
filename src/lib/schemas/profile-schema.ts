import { z } from 'zod';

export const CreateArtistProfileSchema = z.object({
	artist_name: z.string().nonempty('Please enter your Artist name'),
	bio: z.string().nonempty('Please enter your bio'),
	profile_url: z.string().url().nonempty('Please upload your profile picture'),
	profile_thumbnail_url: z.string().url().nonempty(),
	profile_fileid: z.string().nonempty()
});

export const UpdateArtistProfileSchema = z.object({
	artist_name: z.string().nonempty('Please enter your Artist name'),
	bio: z.string().nonempty('Please enter your bio'),
	slug: z.string().optional(),
	profile_url: z.string().url().optional(),
	profile_thumbnail_url: z.string().url().optional(),
	profile_fileid: z.string().optional()
});

export const ChangeArtistPasswordSchema = z.object({
	current_password: z.string().nonempty('Please enter your current password'),
	new_password: z.string().nonempty('Please enter the new password'),
	confirm_new_password: z.string().nonempty('Please confirm the new password')
});
