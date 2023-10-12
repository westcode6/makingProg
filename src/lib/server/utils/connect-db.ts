import mongoose from 'mongoose';
import { MONGODB_URL, NODE_ENV } from '$env/static/private';

let db: any;

declare global {
	var __db: any;
}

async function connectDB() {
	if (db) {
		return db;
	}

	try {
		if (NODE_ENV === 'production') {
			db = await mongoose.connect(MONGODB_URL);
			console.log('Connected to DB: ' + MONGODB_URL);
		} else {
			// in development, need to store the db connection in a global variable
			// this is because the dev server purges the require cache on every request
			// and will cause multiple connections to be made

			if (!global.__db) {
				global.__db = await mongoose.connect(MONGODB_URL);
				console.log('Connected to DB: ' + MONGODB_URL);
			}
			db = global.__db;
		}

		return db;
	} catch (error: any) {
		console.log(`Failed to connect to DB: ${error.message}`);
	}
}

export default connectDB;
