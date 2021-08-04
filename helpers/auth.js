import { hash, compare } from 'bcryptjs';

// form encrypted password
export async function hashPassword(password) {
	const hashedPassword = hash(password, 12); // the higher the no. the more secure it is
	return hashedPassword;
}

// compare input field password to the db hash password
export async function verifyPassword(password, hashedPassword) {
	// returns a boolean
	const isValid = await compare(password, hashedPassword);
	return isValid;
}
