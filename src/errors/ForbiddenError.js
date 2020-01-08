// throw when someone is logged in, but they just aren't allowed to do what they are trying to do or go where they are trying to go
// 403
export default class ForbiddenError extends Error {
	constructor(m = 'Forbidden') {
		super(m);
		this.name = 'ForbiddenError';
	}
}
