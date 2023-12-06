import { WebSocketServer } from 'ws';
import authController from './controllers/auth-controller.js';
import authMiddleware from './middlewares/auth-middleware.js';

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
		try {
			ws.on('message', msg => {
				const { data, type, token } = JSON.parse(msg);

				switch (type) {
					case 'sign-up':
						authController.signup(ws, data);
						break;

					case 'sign-in':
						authController.signin(ws, data);
						break;

					case 'posting':
						authMiddleware.authenticate(ws, token, () => {
							console.log('Posting, posting');
						});
						break;
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}

export default WsServer;
