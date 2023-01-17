import {GameEvent} from "../gameEvent";
import {Checker, Color} from "../../models/figures/checker";
import {EventName} from "../eventName";
import {User} from "../../models/game_components/user";

export abstract class ClientEvent extends GameEvent {
    socketId: string;

    constructor(socketId: string, eventName: EventName) {
        super(eventName);
        this.socketId = socketId;
    }
}