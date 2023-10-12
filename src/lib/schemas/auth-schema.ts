import { z } from 'zod';

export const SignupSchema = z.object({
	email: z.string().email().trim().toLowerCase(),
	password: z.string().min(6)
});

export const VerifyEmailSchema = z.object({
	uuid: z.string().uuid(),
	otp: z.string()
});

export const LoginSchema = z.object({
	email: z.string().email().trim().toLowerCase(),
	password: z.string().min(6)
});
