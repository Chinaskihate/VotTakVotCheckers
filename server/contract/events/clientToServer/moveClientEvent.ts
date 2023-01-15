import {ClientEvent} from "./clientEvent";
import {Checker, Color} from "../../models/figures/checker";
import {User} from "../../models/game_components/user";
import {EventName} from "../eventName";

export class MoveClientEvent extends ClientEvent {
    board: (Checker | null)[][];
    nextMoveColor: Color;

    constructor(board: (Checker | null)[][], nextMoveColor: Color, user: User) {
        super(user, EventName.MOVE);
        this.board = board;
        this.nextMoveColor = nextMoveColor;
        this.user = user;
    }
}