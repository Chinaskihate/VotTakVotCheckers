import {EventName} from "../eventName";
import {GameEvent} from "../gameEvent";

export class RegistrationClientEvent extends GameEvent {
    name: string;

    constructor(name: string) {
        super(EventName.REGISTRATION);
        this.name = name;
    }
}