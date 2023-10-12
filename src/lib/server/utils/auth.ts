import jwt from 'jsonwebtoken';
import { JWT_AUTH_SECRET } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import type { IUser } from '$lib/interfaces';
import { userModel } from '../models';

export const authenticateUser = async (cookies: Cookies): Promise<IUser | null> => {
	try {
		const token = cookies.get('uat');

		if (!token) {
			return null;
		}

		const decoded = jwt.verify(token, JWT_AUTH_SECRET);

		const user = (await userModel.findById(`${decoded.sub}`).lean()) as IUser;
		return user;
	} catch (error) {
		return null;
	}
};

export const authLogin = async ({ user_id, cookies }: { user_id: string; cookies: Cookies }) => {
	const token = jwt.sign(
		{
			sub: user_id
		},
		JWT_AUTH_SECRET,
		{ expiresIn: '7d' }
	);

	return cookies.set('uat', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});
};

export const authLogout = async (cookies: Cookies) => {
	return cookies.set('uat', '', {
		httpOnly: true,
		path: '/',
		maxAge: 0
	});
};
