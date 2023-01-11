import {GameEvent} from "../gameEvent";
import {Checker, Color} from "../../../server/figures/checker";
import {EventName} from "../eventName";
import {User} from "../../../server/game_components/user";

export abstract class ClientEvent extends GameEvent {
    user: User;

    constructor(user: User) {
        super();
        this.user = user;
    }
}