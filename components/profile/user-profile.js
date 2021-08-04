// import { useState, useEffect } from 'react';
// import { getSession } from 'next-auth/client';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
	// // Redirect away if NOT auth
	// const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	// 	// getSession() sends a new request and gets the latest session data
	// 	getSession().then(session => {
	// 		// if NO session then redirect back to the login page
	// 		if (!session) {
	// 			window.location.href = '/auth';
	// 		} else {
	// 			// set state loading false
	// 			setIsLoading(false);
	// 		}
	// 	});
	// }, []);

	// if (isLoading) {
	// 	return <p className={classes.profile}>Loading...</p>;
	// }

	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<ProfileForm />
		</section>
	);
}

export default UserProfile;
