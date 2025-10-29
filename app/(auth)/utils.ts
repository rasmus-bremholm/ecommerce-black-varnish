export const validateEmail = (email: string) => {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return pattern.test(email);
};

export const validatePassword = (password: string) => {
	// 5 chars, 1 uppercase, 1 lower and 1 number
	const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
	return pattern.test(password);
};
