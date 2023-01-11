import {Server} from "socket.io";
const config = require('../../../config/config.json');

export class SocketClient {
    private io = new Server(config['PORT']);

    constructor() {
    }
}