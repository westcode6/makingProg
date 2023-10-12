import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from '../$types';
import { ChangeArtistPasswordSchema } from '$lib/schemas';
import { fail, type Actions } from '@sveltejs/kit';
import { userModel } from '$lib/server/models';
import bcrypt from 'bcryptjs';

export const load: PageServerLoad = async (ctx) => {
	const form = await superValidate(ChangeArtistPasswordSchema);

	return { form };
};

export const actions: Actions = {
	changePassword: async (ctx) => {
		const form = await superValidate(ctx.request, ChangeArtistPasswordSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { current_password, new_password, confirm_new_password } = form.data;

			if (new_password !== confirm_new_password) {
				return fail(400, { form, message: 'Confirm password does not match new password' });
			}

			const user = await userModel.findById(ctx.locals.user?._id).select('email password');

			if (!user) {
				return fail(400, { form, message: 'Request failed. Please login to your dashboard.' });
			}

			const password_match = await bcrypt.compare(current_password, user.password);

			if (!password_match) {
				return fail(400, {
					form,
					message:
						'The current password you entered is wrong. Please enter the current password or proceed to logout and reset your account password'
				});
			}

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(new_password, salt);
			await user.save();

			// TODO: send an email

			return {
				form,
				message: 'Your account password has been changed successfully',
				status: 'success'
			};
		} catch (error) {
			return fail(500, {
				form,
				message: 'We could not change your password. Please try again or contact us.'
			});
		}
	}
};
