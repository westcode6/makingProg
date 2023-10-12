import type { IUser } from './user-interface';

export interface IBill {
	_id: string;
	user: IUser | string;
	subscription: {
		start_date: string;
		end_date: string;
		duration: string;
		plan: string;
		amount: number;
	};
	pay_id: string;
	status: 'pending' | 'success' | 'failed';
	created_at: Date;
	updated_at: Date;
}
