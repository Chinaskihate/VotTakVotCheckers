import {GameEvent} from "../gameEvent";
import {EventName} from "../eventName";

export abstract class ClientEvent extends GameEvent {
    socketId: string;

    constructor(socketId: string, eventName: EventName) {
        super(eventName);
        this.socketId = socketId;
    }
}