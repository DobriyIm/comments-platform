import { WebSocketServer } from 'ws';
import authController from './controllers/auth-controller.js';
import commentController from './controllers/comment-controller.js';
import authMiddleware from './middlewares/auth-middleware.js';
import fileService from './services/file-service.js';

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
						break;
					case 'TEST':
						fileService.uploadFile(data);
						break;
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}

export default WsServer;
