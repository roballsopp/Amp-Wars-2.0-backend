import cors from 'cors';

export default app => {
	app.use(
		cors({
			origin: [/localhost:\d{4}$/],
			methods: ['GET', 'POST'],
		})
	);
};
