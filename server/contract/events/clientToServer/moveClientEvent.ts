import {Checker, Color} from "../../models/figures/checker";
import {EventName} from "../eventName";
import {ClientEvent} from './clientEvent';
import {User} from "../../models/game_components/user";

export class moveClientEvent extends ClientEvent {
    board: Checker[][];
    nextMoveColor: Color;

    constructor(board: Checker[][], nextMoveColor: Color, user: User) {
        super(user, EventName.MOVE);
        this.board = board;
        this.nextMoveColor = nextMoveColor;
        this.user = user;
    }
}