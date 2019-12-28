import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const app = express(),
	allowedOrigins = [
		process.env.CROSS_ORIGIN_FRONT,
		process.env.CROSS_ORIGIN_SERVER
	];

app.disable('x-powered-by');

app
	.use(helmet.xssFilter())
	.use(helmet.noCache())
	.use(helmet.frameguard({ action: 'deny' }))
	.use(
		cors({
			origin: (origin, callback) => {
				if (!origin) return callback(null, true);
				if (allowedOrigins.indexOf(origin) === -1) {
					return callback(
						new Error(
							`La política de CORS para este sitio no permite el acceso desde el origen especificado.`
						),
						false
					);
				}
				return callback(null, true);
			},
			credentials: true
		})
	)
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
	.use(cookieParser('keyboard cat'))
	.use('/public', express.static(path.resolve(__dirname, '../../public')));

export default app;
