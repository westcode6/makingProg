import { z } from 'zod';

export const UploadSingleSchema = z.object({
	cover_art_url: z.string().url('Please upload your cover art image'),
	cover_art_thumbnail_url: z.string().url(),
	cover_art_fileid: z.string(),
	song_url: z.string().url('Please upload your song'),
	song_fileid: z.string(),
	artist_name: z.string().nonempty('Please enter your artist name'),
	featured_artist: z.string().optional(),
	title: z.string().nonempty('Please enter song title'),
	slug: z.string().trim().nonempty('A slug is required'),
	genre: z.string().nonempty('Please enter the song genre'),
	description: z.string().nonempty('Please enter a description'),
	amount: z.number(),
	publish: z.boolean().optional()
});
