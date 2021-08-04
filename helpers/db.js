import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	// connect to MongoDb database which returns a promise
	const client = await MongoClient.connect(
		'mongodb+srv://next-authenticate:Fm04lhz.@cluster0.fwhyj.mongodb.net/auth-demo?retryWrites=true&w=majority'
	);

	return client;
}
