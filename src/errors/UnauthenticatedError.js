// throw when someone's token is bad, missing, or they try to access something without being logged in
// 401
export default class UnauthenticatedError extends Error {
	constructor(m = 'Unauthenticated') {
		super(m);
		this.name = 'UnauthenticatedError';
	}
}
