import { errorHandler } from '@utils';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import routes from './api/v1/index';
import db from "../src/db/index";

const app = () : http.Server => {
	const app = express();

	app.use((_: Request, res: Response, next: NextFunction) => {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Credentials, Set-Cookie'
		)
		res.header('Access-Control-Allow-Credentials', 'true');
		res.header('Access-Control-Allow-Headers',
			'Content-Type, Accept, Access-Control-Allow-Credentials, Cross-Origin');
		res.header('Access-Control-Allow-Methods',
			'GET, POST, PUT, DELETE')
		next();
	});

	app.use(express.json());
	app.get('/health', (_: Request, res: Response) => {
		res.status(200).send({ success: true })
	});


	db();
	app.use("/api/v1", routes);

	app.use(errorHandler);

	app.get('*', (_: Request, res: Response) => {
		res.status(404).send('Not Found')
	});

	const server = http.createServer(app);

	server.on('listening', () => {
		console.info(`Users service listening on port ${process.env.PORT}...`);
	})

	return server;
}

export default app;
