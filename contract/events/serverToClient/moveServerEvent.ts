import {GameEvent} from "../gameEvent";
import {Checker, Color} from "../../../server/figures/checker";
import {EventName} from "../eventName";

export class MoveServerEvent extends GameEvent {
    eventName = EventName.MOVE;
    board: Checker[][];
    nextMoveColor: Color;

    constructor(board: Checker[][], nextMoveColor: Color) {
        super();
        this.board = board;
        this.nextMoveColor = nextMoveColor;
    }
}