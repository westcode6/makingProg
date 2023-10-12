import type { IUploadImage, IUploadSong } from './uploadfile-interface';
import type { IUser } from './user-interface';

export interface ISong {
	_id: string;
	artist: string | IUser;
	artist_name: string;
	featured_artist: string;
	title: string;
	slug: string;
	genre: string;
	description: string;
	album_slug: string;
	amount: number;
	currency: string;
	cover_art: IUploadImage;
	song_upload: IUploadSong;
	song_type: 'single' | 'album';
	status: 'published' | 'draft';

	total_views: number;

	created_at: Date;
	updated_at: Date;
}
