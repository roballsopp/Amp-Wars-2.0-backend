import { UnauthenticatedError, ForbiddenError, NotFoundError, ServerError, formatError } from '../errors';

export default app => {
	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		res = res.status(getStatusCodeFromError(err));
		res.json(formatError(err));
	});
};

function getStatusCodeFromError(err) {
	if (err instanceof UnauthenticatedError) return 401;
	if (err instanceof ForbiddenError) return 403;
	if (err instanceof NotFoundError) return 404;
	if (err instanceof ServerError) return 500;
	return 500;
}
