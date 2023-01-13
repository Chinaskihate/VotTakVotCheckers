import {GameEvent} from "../gameEvent";
import {Checker, Color} from "../../models/figures/checker";
import {EventName} from "../eventName";

export class MoveServerEvent extends GameEvent {
    board: Checker[][];
    nextMoveColor: Color;

    constructor(board: Checker[][], nextMoveColor: Color) {
        super(EventName.START);
        this.board = board;
        this.nextMoveColor = nextMoveColor;
    }
}