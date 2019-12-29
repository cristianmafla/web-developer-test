import http from 'http';
import https from 'https';
import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import config from './src/utils';
import * as routes from './src/routes';

dotenv.config({ path: '.env' });

const app = express();
const environment = process.env.NODE_ENV || 'production';
const configurations = {
	development: { ssl: false, http: 'http', port: 8080, hostname: 'localhost' },
	production: { ssl: true, http: 'https', port: 443, hostname: '<host_url/>' }
};
const CONFIG_SERVER = configurations[environment];

const PORT = process.env.PORT || CONFIG_SERVER.port;

app.use(config);

app.use(routes.users);

app.use(routes.jobs);

app.use('*',(req,res) => {
	res.status(404).send({state:false,data:`página no encontrada`})
})

let httpServer = '';
if (CONFIG_SERVER.ssl) {
	httpServer = https.createServer(
		{
			key: fs.readFileSync(`./`),
			cert: fs.readFileSync(`./`)
		},
		app
	);
} else {
	httpServer = http.createServer(app);
}

httpServer.listen(PORT, () => {
	console.log(
		'==============> ',
		`[ SERVER: ${environment} ] ${CONFIG_SERVER.http}://${CONFIG_SERVER.hostname}:${PORT}`,
		'==============> '
	);
});
