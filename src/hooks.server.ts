import { authenticateUser } from '$lib/server/utils/auth';
import connectDB from '$lib/server/utils/connect-db';
import { redirect, type Handle } from '@sveltejs/kit';

connectDB();

export const handle: Handle = async (ctx) => {
	// authenticate artist:
	if (
		ctx.event.url.pathname.includes('/login') ||
		ctx.event.url.pathname.includes('/signup') ||
		ctx.event.url.pathname.includes('/dashboard')
	) {
		ctx.event.locals.user = await authenticateUser(ctx.event.cookies);

		// if artist is not logged in:
		if (ctx.event.url.pathname.startsWith('/dashboard')) {
			if (!ctx.event.locals.user) {
				throw redirect(303, '/login');
			}
		}

		// if artist is logged in:
		if (['/login', '/signup'].includes(ctx.event.url.pathname)) {
			if (ctx.event.locals.user) {
				throw redirect(303, '/dashboard');
			}
		}
	}

	const response = await ctx.resolve(ctx.event);
	return response;
};
