import jwt from 'jsonwebtoken';
import { UnauthenticatedError, NotFoundError } from '../errors';

export default (app, models) => {
	app.use(async (req, res, next) => {
		const token = req.headers.authorization;

		if (!token) return next(new UnauthenticatedError('No jwt provided'));

		jwt.verify(
			token,
			process.env.JWT_SECRET,
			{
				audience: process.env.JWT_AUDIENCE,
			},
			async (err, resp) => {
				if (err) {
					// TODO: what can this error be? log to sentry?
					console.error(err);
					return next(new UnauthenticatedError('Bad token'));
				}
				const user = await models.user.findByEmail(resp);
				if (!user) throw new NotFoundError('Missing user');
				res.locals.user = user;
				next();
			}
		);
	});
};
