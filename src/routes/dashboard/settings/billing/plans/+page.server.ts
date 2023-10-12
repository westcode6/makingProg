import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { UpdateBillSchema } from '$lib/schemas';
import billModel from '$lib/server/models/bill-model';
import { PREMIUM_PLAN } from '$lib/constants';
import dayjs from 'dayjs';
import { randomUUID } from '$lib/utils';

export const load: PageServerLoad = async (ctx) => {
	const updateBillForm = await superValidate(UpdateBillSchema);

	return { updateBillForm };
};

export const actions: Actions = {
	updateBill: async (ctx) => {
		const user = ctx.locals.user;
		const updateBillForm = await superValidate(ctx.request, UpdateBillSchema);

		try {
			if (!updateBillForm.valid) {
				return fail(400, { updateBillForm, message: 'Failed to proceed! Please try again' });
			}

			const { duration, plan } = updateBillForm.data;

			let start_date = dayjs().format('DD MMM YYYY');
			let end_date = '';
			let amount = 0;

			if (plan === 'premium') {
				switch (duration) {
					case PREMIUM_PLAN.monthly.duration:
						end_date = dayjs().add(1, 'month').format('DD MMM YYYY');
						amount = PREMIUM_PLAN.monthly.amount;
						break;

					case PREMIUM_PLAN.six_months.duration:
						end_date = dayjs().add(6, 'months').format('DD MMM YYYY');
						amount = PREMIUM_PLAN.six_months.amount;
						break;

					case PREMIUM_PLAN.yearly.duration:
						end_date = dayjs().add(1, 'year').format('DD MMM YYYY');
						amount = PREMIUM_PLAN.yearly.amount;
						break;

					default:
						return fail(400, {
							updateBillForm,
							message: 'Premium subscription duration must be an accepted one'
						});
				}
			}

			const bill = await billModel
				.findOne({ $and: [{ user: user?._id }, { status: 'pending' }] })
				.sort({ _id: 'desc' });

			const subscription = {
				start_date,
				end_date,
				duration,
				plan,
				amount
			};

			if (bill) {
				Object.assign(bill.subscription, subscription);
				const updated_bill = await bill.save();

				return { updateBillForm, bill: structuredClone(updated_bill.toObject()) };
			}

			const new_bill = await billModel.create({
				user: user?._id,
				pay_id: randomUUID(),
				subscription
			});

			return { updateBillForm, bill: structuredClone(new_bill.toObject()) };
		} catch (error) {
			console.log(error);
			return fail(500, {
				updateBillForm,
				message: 'Failed to proceed with your subscription. Please try again or contact us.'
			});
		}
	}
};
