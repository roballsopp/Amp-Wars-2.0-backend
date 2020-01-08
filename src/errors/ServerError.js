export default class ServerError extends Error {
	constructor(m = 'Server Error') {
		super(m);
		this.name = 'ServerError';
	}
}
