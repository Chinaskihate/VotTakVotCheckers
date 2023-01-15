import {io} from "socket.io-client";
import {EventName} from "../contract/events/eventName";
import {RegistrationClientEvent} from '../contract/events/clientToServer/registrationClientEvent';
import { StartGameServerEvent } from "../contract/events/serverToClient/startGameServerEvent";
import { EndGameServerEvent } from "../contract/events/serverToClient/endGameServerEvent";
const config = require('../config/config.json');

export class SocketClient {
    private socket = io(config["serverUrl"], {transports: ['websocket']});

    constructor() {
        this.socket.onAny((event, ...args) => {
            console.log(`got ${event}, socket id: ${this.socket.id}`);
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
            const data = args[0];
            const event = new StartGameServerEvent(data.board, data.startColor, data.players);
            callback(event);
        });
    }

    public onEnd(callback: (e: EndGameServerEvent) => void) {
        this.socket.on(EventName.END, (...args) => {
            const data = args[0];
            const event = new EndGameServerEvent(data.gameId, data.status, data.winner);
            callback(event);
        })
    }
}