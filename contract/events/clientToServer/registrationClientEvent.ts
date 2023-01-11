import {EventName} from "../eventName";
import {GameEvent} from "../gameEvent";

export class RegistrationClientEvent extends GameEvent {
    eventName = EventName.REGISTRATION;
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}