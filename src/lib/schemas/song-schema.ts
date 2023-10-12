import { z } from 'zod';

export const UploadSongSchema = z.object({
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
	amount: z.number().optional(),
	publish: z.boolean().optional()
});

export const EditSongSchema = z.object({
	cover_art_url: z.string().url().optional(),
	cover_art_thumbnail_url: z.string().url().optional(),
	cover_art_fileid: z.string().optional(),
	song_url: z.string().url().optional(),
	song_fileid: z.string().optional(),
	artist_name: z.string().optional(),
	featured_artist: z.string().optional(),
	title: z.string().optional(),
	slug: z.string().trim().optional(),
	genre: z.string().optional(),
	description: z.string().optional(),
	amount: z.number().optional(),
	publish: z.boolean().optional()
});

export const DeleteSongSchema = z.object({
	password: z.string().nonempty('For security reasons, please enter your password')
});
