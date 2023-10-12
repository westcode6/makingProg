import type { IBill } from '$lib/interfaces';
import mongoose from 'mongoose';

const BillSchema = new mongoose.Schema<IBill>(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
			index: true
		},
		subscription: {
			start_date: String,
			end_date: String,
			duration: String,
			plan: String,
			amount: Number
		},
		pay_id: {
			type: String,
			index: true,
			required: true
		},
		status: {
			type: String,
			enum: ['pending', 'success', 'failed'],
			default: 'pending',
			index: true
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const billModel = mongoose.models.Bill || mongoose.model('Bill', BillSchema);

export default billModel;
