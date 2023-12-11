import express from 'express';
import * as http from 'http';
import DbConnector from './src/db-connector.js';
import WsServer from './src/ws-server.js';

const app = express();
const server = http.createServer(app);
const wss = new WsServer(server);
const db = new DbConnector(process.env.DB_CONNECTION_STRING);

const PORT = process.env.PORT || 3000;

db.connect()
	.then(() => {
		wss.listen();

		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	})
	.catch(err =>
		console.error('Unable to connect to the database:', err)
	);
