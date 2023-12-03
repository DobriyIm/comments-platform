import express from 'express';
import * as http from 'http';
import WsServer from './src/ws-server.js';

const app = express();
const server = http.createServer(app);
const wss = new WsServer(server);

const PORT = process.env.PORT || 3000;

wss.listen();

server.listen(PORT, () => {
	console.log(`Server lostening on port ${PORT}`);
});
