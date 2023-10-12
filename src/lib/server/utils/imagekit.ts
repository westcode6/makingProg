import ImageKit from 'imagekit';
import { IMAGEKIT_PRIVATE_KEY } from '$env/static/private';
import { PUBLIC_IMAGEKIT_PUBLIC_KEY, PUBLIC_IMAGEKIT_URL_ENDPOINT } from '$env/static/public';

export const imagekit = new ImageKit({
	publicKey: PUBLIC_IMAGEKIT_PUBLIC_KEY,
	privateKey: IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: PUBLIC_IMAGEKIT_URL_ENDPOINT
});
