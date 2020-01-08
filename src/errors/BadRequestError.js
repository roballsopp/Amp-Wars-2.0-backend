// throw when a function of mutation receives bad input
// 400
export default class BadRequestError extends Error {
	constructor(m = 'Bad Request') {
		super(m);
		this.name = 'BadRequestError';
	}
}
