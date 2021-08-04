import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import classes from './auth-form.module.css';

// send request to backend
async function createUser(email, password) {
	// setup post request to our backend
	const response = await fetch('api/auth/signup', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: { 'Content-Type': 'application/json' }
	});

	// convert to json
	const data = await response.json();

	// validate response
	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong');
	}

	return data;
}

// functional component
function AuthForm() {
	const [isLogin, setIsLogin] = useState(true);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const router = useRouter();

	function switchAuthModeHandler() {
		setIsLogin(prevState => !prevState);
	}

	async function submitHandler(event) {
		event.preventDefault();

		// useRef
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		if (isLogin) {
			// log user in
			// specify the provider: credentials, NOT to redirect to a error page,
			const result = await signIn('credentials', {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword
			});

			// redirect
			if (!result.error) {
				// replace current url with this new one
				router.replace('/profile');
			}
		} else {
			try {
				const result = await createUser(enteredEmail, enteredPassword);
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input type='password' id='password' required ref={passwordInputRef} />
				</div>
				<div className={classes.actions}>
					<button>{isLogin ? 'Login' : 'Create Account'}</button>
					<button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
}

export default AuthForm;
