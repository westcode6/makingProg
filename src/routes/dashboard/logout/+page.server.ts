import { authLogout } from '$lib/server/utils';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	logout: async (ctx) => {
		await authLogout(ctx.cookies);

		throw redirect(303, '/login');
	}
};
