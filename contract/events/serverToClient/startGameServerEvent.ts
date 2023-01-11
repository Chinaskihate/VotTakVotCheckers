import {Checker, Color} from "../../../server/figures/checker";
import {GameEvent} from "../gameEvent";
import {EventName} from "../eventName";

export class StartGameServerEvent extends GameEvent {
    eventName = EventName.START;
    board: Checker[][];
    startColor: Color;

    constructor(board: Checker[][], startColor: Color) {
        super();
        this.board = board;
        this.startColor = startColor;
    }
}