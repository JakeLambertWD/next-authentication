import AuthForm from '../components/auth/auth-form';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

function AuthPage() {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		getSession().then(session => {
			if (session) {
				router.replace('/');
			} else {
				setIsLoading(false);
			}
		});
	}, [router]);

	// Same functionality as a Spinner
	if (isLoading) {
		return <p>Is Loading...</p>;
	}

	return <AuthForm />;
}

export default AuthPage;
