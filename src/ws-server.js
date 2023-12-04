import { WebSocketServer } from 'ws';
import authController from './controllers/auth-controller.js';

class WsServer {
	constructor(server) {
		this.wss = new WebSocketServer({ server });
	}

	listen() {
		this.wss.on('connection', async ws => {
			this.handler(ws);
		});
	}

	handler(ws) {
		ws.on('message', msg => {
			const { data, type } = JSON.parse(msg);

			switch (type) {
				case 'sign-up':
					authController.signup(ws, data);
					break;

				case 'sign-in':
					authController.signin(ws, data);
					break;

				case 'posting':
					console.log('3');
					break;
			}
		});
	}
}

export default WsServer;
