import UserProfile from '../components/profile/user-profile';
import { getSession } from 'next-auth/client';

function ProfilePage() {
	return <UserProfile />;
}
// (Server-side Rendering): Fetch data on each request.
export async function getServerSideProps(context) {
	// we have access to the req object
	// getSession will extract the session from the req object ()
	const session = await getSession({ req: context.req });

	// if session is false then redirect to login page
	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false
			}
		};
	}

	return {
		props: { session }
	};
}

export default ProfilePage;
