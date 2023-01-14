import {io} from "socket.io-client";
import {EventName} from "../contract/events/eventName";
import {RegistrationClientEvent} from '../contract/events/clientToServer/registrationClientEvent';
import { StartGameServerEvent } from "../contract/events/serverToClient/startGameServerEvent";
const config = require('../config/config.json');

export class SocketClient {
    private socket = io(config["serverUrl"]);

    constructor() {
    }

    public register(name: string) {
        console.log(config["serverUrl"]);
        this.socket.emit(EventName.REGISTRATION,
            new RegistrationClientEvent(name)
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