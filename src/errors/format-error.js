export default err => {
	if (process.env.NODE_ENV === 'development') {
		return { message: err.message, stack: getStackTraceFromError(err) };
	}
	return { message: err.message };
};

function getStackTraceFromError(err) {
	const stack = (err && err.stack) || '';
	return stack.split('\n');
}
