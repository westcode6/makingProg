import { z } from 'zod';

export const CreateAlbumSchema = z.object({
	cover_art_url: z.string().nonempty('Please upload a cover art for this album'),
	cover_art_thumbnail_url: z.string().nonempty(),
	cover_art_fileid: z.string().nonempty(),
	artist_name: z.string().nonempty(),
	featured_artist: z.string().optional(),
	title: z.string().nonempty(),
	slug: z.string().trim().nonempty(),
	description: z.string().nonempty(),
	amount: z.number().optional(),
	publish: z.boolean().optional()
});

export const EditAlbumSchema = z.object({
	cover_art_url: z.string().url().optional(),
	cover_art_thumbnail_url: z.string().url().optional(),
	cover_art_fileid: z.string().optional(),
	artist_name: z.string().optional(),
	featured_artist: z.string().optional(),
	title: z.string().optional(),
	slug: z.string().trim().optional(),
	description: z.string().optional(),
	amount: z.number().optional(),
	publish: z.boolean().optional()
});
