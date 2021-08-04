import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';

// we execute NextAuth here
export default NextAuth({
	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		jwt: true
	},

	// Authentication Providers in NextAuth.js are services that can be used to sign in a user.
	providers: [
		// The Credentials provider allows you to handle signing in with arbitrary credentials,
		// such as a username and password, two factor authentication or hardware device (e.g. YubiKey U2F / FIDO).
		Providers.Credentials({
			// this authorize method takes in credentials as a param
			async authorize(credentials) {
				// connect to mongodb db
				const client = await connectToDatabase();

				// get access to the db
				const db = client.db();

				// find user
				const user = await db.collection('users').findOne({ email: credentials.email });
				if (!user) {
					client.close();
					throw new Error('User not found!');
				}

				// compare pwd string vs pwd hash
				const isValid = await verifyPassword(credentials.password, user.password);
				if (!isValid) {
					client.close();
					throw new Error('Password incorrect!');
				}

				// close db connection
				client.close();

				// return email
				return { email: user.email };
			}
		})
	]
});
