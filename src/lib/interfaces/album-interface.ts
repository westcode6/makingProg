import type { IUploadImage } from './uploadfile-interface';
import type { IUser } from './user-interface';

export interface IAlbum {
	_id: string;
	artist: IUser | string;
	artist_name: string;
	featured_artist: string;
	title: string;
	slug: string;
	description: string;
	amount: number;
	currency: 'NGN';
	cover_art: IUploadImage;
	songs: string[];
	total_views: number;
	status: 'published' | 'draft';

	created_at: Date;
	updated_at: Date;
}
