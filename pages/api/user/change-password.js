import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../helpers/db';
import { hashPassword, verifyPassword } from '../../../helpers/auth';

async function handler(req, res) {
	// if method is NOT patch then return
	if (req.method !== 'PATCH') {
		return;
	}

	// get session
	const session = await getSession({ req: req });

	if (!session) {
		res.status(401).json({ message: 'Not authenticated' });
		return;
	}

	const userEmail = session.user.email;
	const oldPassword = session.user.oldPassword;
	const newPassword = session.user.newPassword;

	const client = await connectToDatabase();

	const usersCollection = client.db().collection('users');

	const user = await usersCollection.findOne({ email: userEmail });

	if (!user) {
		res.status(404).json({ message: 'User not found' });
		client.close();
		return;
	}

	const currentPassword = user.password;

	// check passwords are equal
	const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

	if (!passwordsAreEqual) {
		res.status(403).json({ message: 'Invalid password' });
		client.close();
		return;
	}

	// hashed password
	const hashedPassword = hashPassword(newPassword);

	// update password in MongoDb
	const result = await usersCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

	client.close();
	res.status(200).json({ message: 'Password updated' });
}

export default handler;
