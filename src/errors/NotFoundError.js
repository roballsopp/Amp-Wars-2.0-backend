export default class NotFoundError extends Error {
	constructor(m = 'Not Found') {
		super(m);
		this.name = 'NotFoundError';
	}
}
