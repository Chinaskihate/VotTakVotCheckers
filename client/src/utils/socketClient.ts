import {io} from "socket.io-client";
//import {EventName} from "../../../contract/events/eventName";
const config = require('../config/config.json');

export class SocketClient {
    private socket = io(config['PORT']);

    constructor() {
    }

    public register(name: string) {

    }
}