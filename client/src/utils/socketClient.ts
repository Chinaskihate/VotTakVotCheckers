import {io} from "socket.io-client";
import {EventName} from "../contract/events/eventName";
import {RegistrationClientEvent} from '../contract/events/clientToServer/registrationClientEvent';
const config = require('../config/config.json');

export class SocketClient {
    private socket = io(config['PORT']);

    constructor() {
    }

    public register(name: string) {
        this.socket.emit(EventName.REGISTRATION, JSON.stringify(
            new RegistrationClientEvent(name)
        ));
    }

    public onStart(callback: () => void) {
        this.socket.on(EventName.START, (...args) => {
            callback();
        });
    }
}