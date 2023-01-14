import {Checker, Color} from "../../models/figures/checker";
import {GameEvent} from "../gameEvent";
import {EventName} from "../eventName";

export class StartGameServerEvent extends GameEvent {
    board: Checker[][];
    startColor: Color;

    constructor(board: Checker[][], startColor: Color) {
        super(EventName.START);
        this.board = board;
        this.startColor = startColor;
    }
}