import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { LoginSchema } from '$lib/schemas';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { userModel } from '$lib/server/models';
import { authLogin, authLogout } from '$lib/server/utils/auth';

export const load: PageServerLoad = async (ctx) => {
	const loginForm = await superValidate(LoginSchema);

	return { loginForm };
};

export const actions: Actions = {
	login: async (ctx) => {
		const loginForm = await superValidate(ctx.request, LoginSchema);

		try {
			if (!loginForm.valid) {
				return fail(400, { loginForm });
			}

			const { email, password } = loginForm.data;

			const user = await userModel.findOne({ email }).select('password');

			if (!user) {
				return fail(400, {
					loginForm,
					message:
						'You entered invalid login email or password. Please check your login details and try again.'
				});
			}

			const password_match = await bcrypt.compare(password, user.password);

			if (!password_match) {
				return fail(400, {
					loginForm,
					message:
						'You entered invalid login email or password. Please check your login details and try again.'
				});
			}

			await authLogin({ user_id: user._id, cookies: ctx.cookies });

			return { loginForm, message: 'Login successful' };
		} catch (error) {
			return fail(500, {
				loginForm,
				message: 'Failed to log you in. Please try again or contact us.'
			});
		}
	}
};
