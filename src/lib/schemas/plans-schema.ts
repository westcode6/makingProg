import { z } from 'zod';

export const UpdateBillSchema = z.object({
	plan: z.string().nonempty('Please select a subscription plan'),
	duration: z.string().nonempty('Please select a subscription duration')
});
