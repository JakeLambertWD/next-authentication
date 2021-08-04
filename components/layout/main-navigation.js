import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import classes from './main-navigation.module.css';

function MainNavigation() {
	// deconstruct array
	const [session, loading] = useSession();

	// sign out
	function logoutHandler() {
		signOut();
	}

	return (
		<header className={classes.header}>
			<Link href='/'>
				<a>
					<div className={classes.logo}>Next Auth</div>
				</a>
			</Link>
			<nav>
				<ul>
					{/* login tab dependant on session & loading being false */}
					{!session && !loading && (
						<li>
							<Link href='/auth'>Login</Link>
						</li>
					)}
					{/* profile tab dependant on session being true */}
					{session && (
						<li>
							<Link href='/profile'>Profile</Link>
						</li>
					)}
					{/* logout tab dependant on session being true */}
					{session && (
						<li>
							<button onClick={logoutHandler}>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
