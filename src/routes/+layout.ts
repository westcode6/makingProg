import type { LayoutServerLoad } from './dashboard/$types';

export const load: LayoutServerLoad = async ({ url }) => {
	return {
		url: url.pathname
	};
};
