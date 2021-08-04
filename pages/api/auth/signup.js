import { hashPassword } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';

async function handler(req, res) {
	// check method type
	if (req.method !== 'POST') {
		return;
	}

	// extract data from request body
	const data = req.body;
	const { email, password } = data;

	// validate
	if (!email || !email.includes('@') || !password || password.trim().length < 7) {
		res.status(422).json({ message: 'Invalid Input' });
		// end function here.
		return;
	}

	// connect to database
	const client = await connectToDatabase();

	// get access to database
	const db = client.db();

	// find existing user
	const existingUser = await db.collection('users').findOne({ email: email });
	if (existingUser) {
		res.status(422).json({ message: 'User already exists' });
		client.close();
		// end function here.
		return;
	}

	// encrypt password
	const hashedPassword = await hashPassword(password);

	// insert into db
	const result = await db.collection('users').insertOne({
		email: email,
		// for security reasons, it is best practice to encrypt the password using bcrypt.js
		password: hashedPassword
	});

	res.status(201).json({ message: 'Created user!' });
	client.close();
}

export default handler;
