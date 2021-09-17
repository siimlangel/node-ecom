import { errorHandler } from '@utils';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import routes from './api/v1/index';
import db from "../src/db/index";
import session from 'express-session';
import FileStore from 'session-file-store';
import { randomUUID } from 'crypto';
import passport from 'passport';
import passportLocal from 'passport-local';
import { User as UserModel } from '@models';

const app = (): http.Server => {
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

	const LocalStrategy = passportLocal.Strategy

	passport.use(new LocalStrategy(
		{usernameField: "email"},
		async (email, password, done) => {
			const user: UserModel = await UserModel.query().findOne({email, password});
			if (user) return done(null, user);
			return done(null, false);
		}
	))

	passport.serializeUser((user, done) => {
			done(null, user.id);
		})

	passport.deserializeUser(async (id: string, done) => {
		const user: UserModel = await UserModel.query().findById(id);
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	})



	app.use(session({
		genid: (_: Request) => {
			return randomUUID();
		},
		store: new (FileStore(session))(),
		secret: "abcd",
		resave: false,
		saveUninitialized: true
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	db();

	app.get('/login', (req: Request, res: Response) => {
		console.log("Inside GET /login callback");
		console.log(req.sessionID, req.user);
		res.json({
			user: req.session,
			message: "GET /login"
		});
	});

	app.post('/login', (req: Request, res: Response, next: NextFunction) => {
		console.log("Inside POST /login")

		passport.authenticate('local', (err, user, info) => {
			console.log('		Inside passport.authenticate() callback');
			console.log(`		req.session: ${JSON.stringify(req.session)}`)
			console.log(`		req.user: ${JSON.stringify(req.user)}`)

			if(info) {return res.send(info.message)}
			if (err) { return next(err); }
			if (!user) { return res.redirect('/login'); }

			req.login(user, (err) => {
				console.log('				Inside req.login() callback')
				console.log(`				req.session: ${JSON.stringify(req.session)}`)
				console.log(`				req.user: ${JSON.stringify(req.user)}`)

				if (err) { return next(err); }
				return res.json({user});
			})
		})(req, res, next);
	})

	app.get('/authrequired', (req: Request, res: Response) => {
		if(req.isAuthenticated()) {
			res.json(req.user);
		} else {
			res.status(401).send("Unauthorized");
		}
	})

	app.get('/health', (_: Request, res: Response) => {
		res.status(200).send({ success: true })
	});

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
