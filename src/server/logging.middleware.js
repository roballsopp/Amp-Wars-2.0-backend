import morgan from 'morgan';

export default (app, options) => {
	app.use(morgan('combined', options));
};
