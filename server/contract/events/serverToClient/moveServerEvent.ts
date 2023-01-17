import {GameEvent} from "../gameEvent";
import {Checker, Color} from "../../models/figures/checker";
import {EventName} from "../eventName";
import {User} from "../../models/game_components/user";

export class MoveServerEvent extends GameEvent {
    board: Checker[][];
    nextMoveColor: Color;
    players: User[];

    constructor(board: Checker[][], nextMoveColor: Color, players: User[]) {
        super(EventName.MOVE);
        this.board = board;
        this.nextMoveColor = nextMoveColor;
        this.players = players;
    }
}