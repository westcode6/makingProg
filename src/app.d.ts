// See https://kit.svelte.dev/docs/types#app

import type { IUser } from '$lib/interfaces';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: IUser | null;
			artist_page: {
				_id: string;
				profile_pic: { url: string; thumbnail_url: string };
				artist_name: string;
				slug: string;
				bio: any;
				created_at: Date;
			} | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module 'svelte-filepond';

export {};
