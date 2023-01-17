import {GameEvent} from "../gameEvent";
import {Checker, Color} from "../../models/figures/checker";
import {EventName} from "../eventName";
import {ClientEvent} from './clientEvent';
import {User} from "../../models/game_components/user";

export class MoveClientEvent extends ClientEvent {
    board: (Checker | null)[][];
    nextMoveColor: Color;

    constructor(board: (Checker | null)[][], nextMoveColor: Color, socketId: string) {
        super(socketId, EventName.MOVE);
        this.board = board;
        this.nextMoveColor = nextMoveColor;
    }
}