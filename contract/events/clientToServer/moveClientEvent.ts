import {GameEvent} from "../gameEvent";
import {Checker, Color} from "../../../server/figures/checker";
import {EventName} from "../eventName";
import {ClientEvent} from './clientEvent';
import {User} from "../../../server/game_components/user";

export class moveClientEvent extends ClientEvent {
    eventName = EventName.MOVE;
    board: Checker[][];
    nextMoveColor: Color;

    constructor(board: Checker[][], nextMoveColor: Color, user: User) {
        super(user);
        this.board = board;
        this.nextMoveColor = nextMoveColor;
        this.user = user;
    }
}