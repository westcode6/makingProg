import type { IUploadImage } from './uploadfile-interface';

export interface IUser {
	_id: string;
	profile_pic: IUploadImage;
	artist_name: string;
	bio: string;
	slug: string;
	email: string;
	password: string;

	verify_otp: string;
	verify_uuid: string;
	has_verified_email: boolean;

	created_at: Date;
	updated_at: Date;
}
