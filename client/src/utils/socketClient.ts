import {io} from "socket.io-client";
import {EventName} from "../contract/events/eventName";
import {RegistrationClientEvent} from '../contract/events/clientToServer/registrationClientEvent';
import { StartGameServerEvent } from "../contract/events/serverToClient/startGameServerEvent";
const config = require('../config/config.json');

export class SocketClient {
    private socket = io(config["serverUrl"], {transports: ['websocket']});

    constructor() {
        this.socket.onAny((event, ...args) => {
            console.log(`got ${event}`);
        });
        this.socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }

    public register(name: string) {
        console.log('trying to connect: ' + JSON.stringify(new RegistrationClientEvent(name)));
        this.socket.emit(EventName.REGISTRATION,
            JSON.stringify(new RegistrationClientEvent(name))
        );
    }

    public onStart(callback: (e: StartGameServerEvent) => void) {
        this.socket.on(EventName.START, (...args) => {
            const data = JSON.parse(args[0]);
            const event = new StartGameServerEvent(data.board, data.startColor);
            callback(event);
        });
    }
}