import { WebSocketServer } from 'ws';

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
					console.log('1');
					break;

				case 'sign-in':
					console.log('2');
					break;

				case 'posting':
					console.log('3');
					break;
			}
		});
	}
}

export default WsServer;
