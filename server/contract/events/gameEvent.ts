import {EventName} from "./eventName";

export class GameEvent {
    readonly eventName: EventName;

    constructor(eventName: EventName) {
        this.eventName = eventName;
    }
}