import {GameEvent} from "../gameEvent";
import {Checker, Color} from "../../models/figures/checker";
import {EventName} from "../eventName";
import {User} from "../../models/game_components/user";

export abstract class ClientEvent extends GameEvent {
    user: User;

    constructor(user: User, eventName: EventName) {
        super(eventName);
        this.user = user;
    }
}