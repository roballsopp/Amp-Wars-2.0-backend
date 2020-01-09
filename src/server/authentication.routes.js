import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BadRequestError, UnauthenticatedError } from '../errors';

export default (app, models) => {
	app.post('/login', async (req, res, next) => {
		const { email, password } = req.body;
		if (!email || !password) return next(new BadRequestError('Must supply email and password'));
		const user = await models.user.findByEmailWithPassword(email);
		if (!user) return next(new UnauthenticatedError('Bad email or password'));
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) return next(new UnauthenticatedError('Bad email or password'));

		jwt.sign(
			{
				user: {
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					// make sure password never shows up here
				},
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '30d', // expire in 30 days
				audience: process.env.JWT_AUDIENCE,
			},
			(err, token) => {
				// TODO: log more specific sentry error?
				if (err) {
					console.error(err);
					// TODO: server error?
					return next(new UnauthenticatedError('Bad email or password'));
				}
				res.status(200).json({ token });
			}
		);
	});
};
