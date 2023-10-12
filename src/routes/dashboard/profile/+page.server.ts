import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async (ctx) => {
	const user = ctx.locals.user;

	return { user: structuredClone(user) };
};
