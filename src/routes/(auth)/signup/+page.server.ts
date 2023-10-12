import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { SignupSchema, VerifyEmailSchema } from '$lib/schemas';
import bcrypt from 'bcryptjs';
import { userModel } from '$lib/server/models';
import { generateOTP, randomUUID } from '$lib/utils';
import { authLogin } from '$lib/server/utils/auth';
import { sendTransactionalMail } from '$lib/server/api';

export const load: PageServerLoad = async (ctx) => {
	const signupForm = await superValidate(SignupSchema);
	const verifyEmailForm = await superValidate(VerifyEmailSchema);

	return { signupForm, verifyEmailForm };
};

export const actions: Actions = {
	signup: async (ctx) => {
		const signupForm = await superValidate(ctx.request, SignupSchema);

		try {
			if (!signupForm.valid) {
				return fail(400, { signupForm });
			}

			const { email, password } = signupForm.data;

			const user = await userModel.findOne({ email });

			if (user) {
				return fail(418, {
					signupForm,
					message: 'This email is already associated with an account. Please use another email.'
				});
			}

			const salt = await bcrypt.genSalt(10);
			const password_hash = await bcrypt.hash(password, salt);

			const verify_otp = generateOTP();
			const verify_uuid = randomUUID();

			await sendTransactionalMail({
				to: [{ name: 'Artist', email }],
				subject: 'Please verify your email',
				HTMLContent: `<p>Hello Artist,</p>
			<p>Welcome to Kokolity! Please verify your account by copying the OTP below:</p>
			<p><strong>${verify_otp}</strong></p><br />
			<p>If you did not make this request, please contact us immediately.</p><br />
			<p>Warm Regards,</p>
			<p>Team Kokolity</p>`
			});

			await userModel.create({
				email,
				password: password_hash,
				verify_otp,
				verify_uuid,
				slug: randomUUID()
			});

			return { signupForm, verify_uuid };
		} catch (error) {
			return fail(500, {
				signupForm,
				message: 'Failed to create your account. Please try again or contact us.'
			});
		}
	},
	verifyEmail: async (ctx) => {
		const verifyEmailForm = await superValidate(ctx.request, VerifyEmailSchema);

		try {
			if (!verifyEmailForm.valid) {
				return fail(400, { verifyEmailForm });
			}

			const { uuid, otp } = verifyEmailForm.data;

			const user = await userModel
				.findOne({ verify_uuid: uuid })
				.select('verify_otp verify_uuid has_verified_email');

			if (!user) {
				return fail(400, {
					verifyEmailForm,
					message: 'Invalid OTP. Please click the resend button to get another OTP.'
				});
			}

			if (user.has_verified_email) {
				return fail(400, {
					verifyEmailForm,
					message:
						'Your email is already verified. Please proceed to login to your dashboard instead.'
				});
			}

			// for testing purpose only:
			if (otp !== '123456') {
				return fail(400, {
					verifyEmailForm,
					message:
						'The OTP you entered is not correct. Please check your email or click the resend button to get another OTP.'
				});
			}

			// if (otp !== user.verify_otp) {
			// 	return fail(400, {
			// 		verifyEmailForm,
			// 		message:
			// 			'The OTP you entered is not correct. Please check your email or click the resend button to get another OTP.'
			// 	});
			// }

			user.has_verified_email = true;
			user.verify_uuid = '';
			user.verify_otp = '';

			await user.save();

			// log in the user here
			await authLogin({ user_id: user._id, cookies: ctx.cookies });

			return { verifyEmailForm, message: 'Your account has been verified successfully' };
		} catch (error) {
			return fail(500, {
				verifyEmailForm,
				message: 'Failed to verify your email. Please try again or contact us.'
			});
		}
	}
};
