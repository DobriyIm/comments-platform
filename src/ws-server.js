import { WebSocket, WebSocketServer } from 'ws';
import authController from './controllers/auth-controller.js';
import commentController from './controllers/comment-controller.js';
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

	broadcast(ws) {
		this.wss.clients.forEach(client => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				commentController.notify(client);
			}
		});
	}

	handler(ws) {
		try {
			ws.on('message', msg => {
				const { data, event } = JSON.parse(msg);

				switch (event) {
					case 'SIGN_UP':
						authController.signup(ws, data);
						break;

					case 'SIGN_IN':
						authController.signin(ws, data);
						break;

					case 'ADD_COMMENT':
						authMiddleware.authenticate(ws, msg, () =>
							commentController.create(ws, data)
						);
						this.broadcast(ws);
						break;
					case 'GET_PART':
						authMiddleware.authenticate(ws, msg, () =>
							commentController.getPart(ws, data)
						);
						break;
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}

export default WsServer;
