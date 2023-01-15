import {io} from "socket.io-client";
import {EventName} from "../contract/events/eventName";
import {RegistrationClientEvent} from '../contract/events/clientToServer/registrationClientEvent';
import { StartGameServerEvent } from "../contract/events/serverToClient/startGameServerEvent";
import { EndGameServerEvent } from "../contract/events/serverToClient/endGameServerEvent";
import { Board } from "../contract/models/game_components/board";
import { User } from "../contract/models/game_components/user";
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

    public getSocketId(): string {
        return this.socket.id;
    }

    public register(name: string) {
        console.log('trying to connect: ' + JSON.stringify(new RegistrationClientEvent(name)));
        this.socket.emit(EventName.REGISTRATION,
            JSON.stringify(new RegistrationClientEvent(name))
        );
    }

    public onStart(callback: (e: StartGameServerEvent) => void) {
        this.socket.on(EventName.START, (args) => {
            const users = args.players.map((p: any) => new User(p))
            const board = new Board(args.board);
            const event = new StartGameServerEvent(args.board, args.startColor, users);
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